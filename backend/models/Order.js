const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  consumer:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmer:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:     { type: String },
    price:    { type: Number },
    quantity: { type: Number },
    unit:     { type: String }
  }],

  totalAmount:    { type: Number, required: true },
  platformFee:    { type: Number, default: 0 },
  farmerPayout:   { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'disputed'],
    default: 'pending'
  },

  // Payment simulation
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded', 'held'], default: 'unpaid' },
  paymentId:     { type: String, default: '' },

  // Delivery
  deliveryAddress: { type: String, default: '' },
  deliveryNotes:   { type: String, default: '' },

  // Timestamps
  confirmedAt:  { type: Date },
  shippedAt:    { type: Date },
  deliveredAt:  { type: Date },
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
