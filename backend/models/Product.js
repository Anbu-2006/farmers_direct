const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  category:    { type: String, required: true, enum: ['Vegetables', 'Fruits', 'Greens', 'Spices', 'Poultry', 'Dairy', 'Grains'] },
  price:       { type: Number, required: true },
  unit:        { type: String, default: 'kg' },
  quantity:    { type: Number, required: true },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  freshness:   { type: String, default: 'Harvested Today' },
  quality:     { type: String, enum: ['A-Grade', 'B-Grade', 'C-Grade', 'Organic'], default: 'B-Grade' },
  isOrganic:   { type: Boolean, default: false },

  // Farmer reference
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Blockchain traceability
  blockchainHash: { type: String, default: '' },
  traceLog: [{
    event:     { type: String },
    timestamp: { type: Date, default: Date.now },
    location:  { type: String },
    details:   { type: String }
  }],

  // AI suggested price
  aiSuggestedPrice: { type: Number, default: 0 },

  // Stats
  rating:   { type: Number, default: 0, min: 0, max: 5 },
  reviews:  { type: Number, default: 0 },
  sold:     { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now }
});

productSchema.index({ category: 1, price: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);
