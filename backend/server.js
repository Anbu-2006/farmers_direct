require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/ai', require('./routes/ai'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV });
});

// Dashboard stats (admin)
app.get('/api/stats', async (req, res) => {
  try {
    const User = require('./models/User');
    const Product = require('./models/Product');
    const Order = require('./models/Order');

    const [farmers, consumers, products, orders] = await Promise.all([
      User.countDocuments({ role: 'farmer' }),
      User.countDocuments({ role: 'consumer' }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments()
    ]);

    const revenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      farmers, consumers, products, orders,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all: serve login page as entry point
app.get('{*path}', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'admin-login.html'));
  }
});

// Auto-seed function
async function autoSeed() {
  const User = require('./models/User');
  const count = await User.countDocuments();
  if (count === 0) {
    console.log('📦 Empty database detected — auto-seeding...');
    require('./seed-data')();
  }
}

// Start
const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await autoSeed();
  app.listen(PORT, () => {
    console.log(`\n🚀 Farmer's Direct API running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints at http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend served at http://localhost:${PORT}\n`);
  });
})();
