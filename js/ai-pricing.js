// === AI-PRICING.JS — Groq AI Market Price Prediction ===

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// State
let apiKey = localStorage.getItem('groq_api_key') || '';

// Save API key
function saveApiKey() {
  const input = document.getElementById('api-key-input');
  apiKey = input.value.trim();
  if (!apiKey) return alert('Please enter a valid API key.');
  localStorage.setItem('groq_api_key', apiKey);
  document.getElementById('key-setup').style.display = 'none';
  document.getElementById('prediction-tool').style.display = 'block';
}

// Clear API key
function clearApiKey() {
  localStorage.removeItem('groq_api_key');
  apiKey = '';
  document.getElementById('key-setup').style.display = 'block';
  document.getElementById('prediction-tool').style.display = 'none';
}

// Build the AI prompt
function buildPrompt(crop, qty, unit, location, quality) {
  return `You are an expert Indian agricultural market analyst AI for the "Farmer's Direct" platform. Analyze the following crop and provide a detailed market price prediction.

Crop: ${crop}
Quantity: ${qty} ${unit}
Location: ${location}, India
Quality Grade: ${quality}

Respond in this EXACT JSON format (no markdown, no code fences, just raw JSON):
{
  "crop": "${crop}",
  "suggested_price_per_kg": "<number>",
  "price_range": { "min": "<number>", "max": "<number>" },
  "apmc_reference_price": "<number>",
  "platform_advantage_percent": "<number>",
  "trend": "<Rising | Stable | Declining>",
  "trend_reason": "<1 sentence why>",
  "demand_level": "<High | Medium | Low>",
  "best_selling_window": "<e.g. Next 3-5 days>",
  "storage_tip": "<1 sentence>",
  "summary": "<2-3 sentence market analysis>"
}`;
}

// Call Groq API
async function getPrediction() {
  const crop = document.getElementById('crop-name').value.trim();
  const qty = document.getElementById('crop-qty').value.trim();
  const unit = document.getElementById('crop-unit').value;
  const location = document.getElementById('crop-location').value.trim();
  const quality = document.getElementById('crop-quality').value;

  if (!crop || !qty || !location) {
    return alert('Please fill in all required fields.');
  }

  const resultsDiv = document.getElementById('ai-results');
  const loader = document.getElementById('ai-loader');
  const btn = document.getElementById('predict-btn');

  btn.disabled = true;
  btn.innerHTML = '<span class="btn-spinner"></span> Analyzing...';
  loader.style.display = 'flex';
  resultsDiv.innerHTML = '';

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are an expert Indian agricultural market price analyst. Always respond with valid JSON only, no markdown.' },
          { role: 'user', content: buildPrompt(crop, qty, unit, location, quality) }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `API Error: ${res.status}`);
    }

    const data = await res.json();
    const raw = data.choices[0].message.content.trim();

    // Parse JSON — strip markdown fences if present
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const prediction = JSON.parse(cleaned);

    renderPrediction(prediction);
  } catch (err) {
    resultsDiv.innerHTML = `<div class="ai-error"><p>⚠️ ${err.message}</p><p style="font-size:0.82rem;color:#999;margin-top:8px;">Check your API key or try again.</p></div>`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🔮 Get AI Price Prediction';
    loader.style.display = 'none';
  }
}

// Render prediction results
function renderPrediction(p) {
  const trendIcon = p.trend === 'Rising' ? '📈' : p.trend === 'Declining' ? '📉' : '➡️';
  const trendColor = p.trend === 'Rising' ? '#2d6a2d' : p.trend === 'Declining' ? '#c0392b' : 'var(--gold-deep)';
  const demandColor = p.demand_level === 'High' ? '#2d6a2d' : p.demand_level === 'Low' ? '#c0392b' : 'var(--gold-deep)';

  document.getElementById('ai-results').innerHTML = `
    <div class="prediction-card reveal visible">
      <div class="pred-header">
        <div>
          <span class="section-label" style="color:var(--gold);">AI Market Analysis</span>
          <h2 style="color:var(--white-off);margin-top:4px;">${p.crop}</h2>
        </div>
        <div class="pred-badge" style="background:${trendColor}20;color:${trendColor};border:1px solid ${trendColor}40;">
          ${trendIcon} ${p.trend}
        </div>
      </div>

      <div class="pred-price-hero">
        <span class="pred-price-label">AI Suggested Price</span>
        <span class="pred-price-value">₹${p.suggested_price_per_kg}</span>
        <span class="pred-price-unit">per kg</span>
      </div>

      <div class="pred-metrics">
        <div class="pred-metric">
          <span class="pm-label">Price Range</span>
          <span class="pm-value">₹${p.price_range.min} – ₹${p.price_range.max}</span>
        </div>
        <div class="pred-metric">
          <span class="pm-label">APMC Reference</span>
          <span class="pm-value">₹${p.apmc_reference_price}/kg</span>
        </div>
        <div class="pred-metric">
          <span class="pm-label">Platform Advantage</span>
          <span class="pm-value" style="color:#2d6a2d;">+${p.platform_advantage_percent}%</span>
        </div>
        <div class="pred-metric">
          <span class="pm-label">Demand Level</span>
          <span class="pm-value" style="color:${demandColor};">${p.demand_level}</span>
        </div>
        <div class="pred-metric">
          <span class="pm-label">Best Selling Window</span>
          <span class="pm-value">${p.best_selling_window}</span>
        </div>
        <div class="pred-metric">
          <span class="pm-label">Trend Reason</span>
          <span class="pm-value" style="font-size:0.82rem;">${p.trend_reason}</span>
        </div>
      </div>

      <div class="pred-insights">
        <div class="pred-insight-box">
          <h4>💡 Storage Tip</h4>
          <p>${p.storage_tip}</p>
        </div>
        <div class="pred-insight-box">
          <h4>📊 Market Summary</h4>
          <p>${p.summary}</p>
        </div>
      </div>
    </div>
  `;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  if (apiKey) {
    document.getElementById('key-setup').style.display = 'none';
    document.getElementById('prediction-tool').style.display = 'block';
  }
});
