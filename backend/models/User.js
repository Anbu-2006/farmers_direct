const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  phone:    { type: String, default: '' },
  role:     { type: String, enum: ['farmer', 'consumer', 'admin'], default: 'consumer' },

  // Farmer-specific fields
  farmName:   { type: String, default: '' },
  location:   { type: String, default: '' },
  isVerified: { type: Boolean, default: false },

  avatar:    { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password
userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
