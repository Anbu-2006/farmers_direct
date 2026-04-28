const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// POST /api/ai/predict — Get AI price prediction
router.post('/predict', auth, async (req, res) => {
  try {
    const { crop, quantity, unit, location, quality } = req.body;
    if (!crop || !location) return res.status(400).json({ error: 'Crop name and location are required.' });

    const prompt = `You are an expert Indian agricultural market analyst AI. Analyze the following crop and provide a detailed market price prediction.

Crop: ${crop}
Quantity: ${quantity || 100} ${unit || 'kg'}
Location: ${location}, India
Quality Grade: ${quality || 'B-Grade'}

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

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are an expert Indian agricultural market price analyst. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Groq API error' });
    }

    const data = await response.json();
    const raw = data.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const prediction = JSON.parse(cleaned);

    res.json(prediction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
