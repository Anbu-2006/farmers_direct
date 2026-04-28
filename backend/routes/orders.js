const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders — Consumer: Place order
router.post('/', auth, authorize('consumer'), async (req, res) => {
  try {
    const { items, deliveryAddress, deliveryNotes } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items in order.' });

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).populate('farmer');
      if (!product || !product.isActive) continue;

      const lineTotal = product.price * item.quantity;
      totalAmount += lineTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit
      });

      // Add trace log entry
      product.traceLog.push({
        event: 'Order Placed',
        location: deliveryAddress || 'Consumer',
        details: `Ordered ${item.quantity} ${product.unit} by consumer`
      });
      product.sold += item.quantity;
      await product.save();
    }

    const platformFee = Math.round(totalAmount * 0.05);
    const farmerPayout = totalAmount - platformFee;

    // Generate simulated payment ID
    const paymentId = 'PAY_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);

    const order = await Order.create({
      consumer: req.user._id,
      farmer: orderItems[0]?.product ? (await Product.findById(orderItems[0].product)).farmer : null,
      items: orderItems,
      totalAmount,
      platformFee,
      farmerPayout,
      deliveryAddress,
      deliveryNotes,
      paymentId,
      paymentStatus: 'paid' // Simulated instant payment
    });

    res.status(201).json({ order, message: 'Order placed successfully! Payment simulated.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/mine — Consumer: My orders
router.get('/mine', auth, async (req, res) => {
  try {
    const filter = req.user.role === 'farmer'
      ? { farmer: req.user._id }
      : { consumer: req.user._id };

    const orders = await Order.find(filter)
      .populate('consumer', 'name email')
      .populate('farmer', 'name farmName location')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/status — Farmer/Admin: Update order status
router.put('/:id/status', auth, authorize('farmer', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });

    order.status = status;
    if (status === 'confirmed') order.confirmedAt = new Date();
    if (status === 'shipped') order.shippedAt = new Date();
    if (status === 'delivered') {
      order.deliveredAt = new Date();
      order.paymentStatus = 'paid';
    }
    if (status === 'cancelled') order.paymentStatus = 'refunded';

    await order.save();
    res.json({ order, message: `Order ${status}.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/all — Admin only
router.get('/all', auth, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('consumer', 'name email')
      .populate('farmer', 'name farmName')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
