const express = require('express');
const Product = require('../models/Product');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// GET /api/products — Public: Browse all active products
router.get('/', async (req, res) => {
  try {
    const { category, maxPrice, minPrice, sort, search, limit = 20 } = req.query;
    const filter = { isActive: true };

    if (category && category !== 'All') filter.category = category;
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (search) filter.name = { $regex: search, $options: 'i' };

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const products = await Product.find(filter)
      .populate('farmer', 'name location farmName')
      .sort(sortOption)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);
    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — Public: Single product with trace log
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name location farmName phone');
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products — Farmer only: Create listing
router.post('/', auth, authorize('farmer', 'admin'), async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      farmer: req.user._id,
      traceLog: [{
        event: 'Product Listed',
        location: req.user.location || 'Farm',
        details: `Listed by ${req.user.name}`
      }]
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id — Farmer only: Update listing
router.put('/:id', auth, authorize('farmer', 'admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not your product.' });
    }

    Object.assign(product, req.body);
    product.traceLog.push({ event: 'Product Updated', location: req.user.location, details: `Updated by ${req.user.name}` });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id — Farmer/Admin: Remove listing
router.delete('/:id', auth, authorize('farmer', 'admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not your product.' });
    }
    await product.deleteOne();
    res.json({ message: 'Product removed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/farmer/mine — Farmer: Get my listings
router.get('/farmer/mine', auth, authorize('farmer'), async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
