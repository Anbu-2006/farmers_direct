require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const seedDB = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create admin
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@farmersdirect.in',
    password: 'admin123',
    role: 'admin'
  });

  // Create farmers
  const farmer1 = await User.create({
    name: 'Ravi Kumar',
    email: 'ravi@farmer.in',
    password: 'farmer123',
    role: 'farmer',
    farmName: 'Kumar Organic Farm',
    location: 'Tumkur, Karnataka',
    isVerified: true
  });

  const farmer2 = await User.create({
    name: 'Lakshmi Devi',
    email: 'lakshmi@farmer.in',
    password: 'farmer123',
    role: 'farmer',
    farmName: 'Devi Natural Farms',
    location: 'Mysuru, Karnataka',
    isVerified: true
  });

  // Create consumers
  const consumer1 = await User.create({
    name: 'Priya Sharma',
    email: 'priya@consumer.in',
    password: 'consumer123',
    role: 'consumer',
    location: 'Bangalore'
  });

  console.log('👤 Created users (admin, 2 farmers, 1 consumer)');

  // Create products
  const products = await Product.insertMany([
    {
      name: 'Organic Cherry Tomatoes', category: 'Vegetables', price: 85, unit: 'kg',
      quantity: 200, quality: 'Organic', isOrganic: true, farmer: farmer1._id,
      freshness: 'Harvested Today', rating: 4.8, reviews: 24,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      description: 'Hand-picked organic cherry tomatoes grown in red soil without pesticides.',
      aiSuggestedPrice: 90,
      traceLog: [
        { event: 'Seeds Planted', location: 'Tumkur, Karnataka', details: 'Organic heirloom seeds' },
        { event: 'Crop Harvested', location: 'Kumar Organic Farm', details: 'Hand-picked at peak ripeness' },
        { event: 'Quality Checked', location: 'Farm Gate', details: 'Grade: A-Premium, No pesticide residue' },
        { event: 'Listed on Platform', location: 'Farmer\'s Direct', details: 'Available for direct purchase' }
      ]
    },
    {
      name: 'Fresh Alphonso Mangoes', category: 'Fruits', price: 320, unit: 'dozen',
      quantity: 50, quality: 'A-Grade', farmer: farmer2._id,
      freshness: 'Picked Yesterday', rating: 4.9, reviews: 42,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
      description: 'Premium Alphonso mangoes from Mysuru orchards. Naturally ripened.',
      aiSuggestedPrice: 350,
      traceLog: [
        { event: 'Tree Cultivated', location: 'Mysuru, Karnataka', details: '12-year-old Alphonso trees' },
        { event: 'Fruit Harvested', location: 'Devi Natural Farms', details: 'Naturally ripened on tree' },
        { event: 'Listed on Platform', location: 'Farmer\'s Direct', details: 'Available for purchase' }
      ]
    },
    {
      name: 'Farm Fresh Spinach', category: 'Greens', price: 40, unit: 'bunch',
      quantity: 150, quality: 'A-Grade', farmer: farmer1._id,
      freshness: 'Harvested Today', rating: 4.6, reviews: 18,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      description: 'Crisp, dark green spinach leaves. Rich in iron and vitamins.',
      aiSuggestedPrice: 45,
      traceLog: [
        { event: 'Seeds Sown', location: 'Tumkur', details: 'Organic spinach seeds' },
        { event: 'Harvested', location: 'Kumar Organic Farm', details: 'Morning harvest for max freshness' },
        { event: 'Listed', location: 'Farmer\'s Direct', details: 'Same-day listing' }
      ]
    },
    {
      name: 'Red Chilli Powder', category: 'Spices', price: 180, unit: 'kg',
      quantity: 80, quality: 'A-Grade', farmer: farmer2._id,
      freshness: 'Sun-Dried & Ground', rating: 4.7, reviews: 31,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
      description: 'Stone-ground Guntur red chilli powder. Pure, no additives.',
      aiSuggestedPrice: 200,
      traceLog: [
        { event: 'Chillies Harvested', location: 'Mysuru', details: 'Guntur variety' },
        { event: 'Sun Dried', location: 'Farm', details: '7 days natural drying' },
        { event: 'Stone Ground', location: 'Local Mill', details: 'Traditional grinding' },
        { event: 'Listed', location: 'Farmer\'s Direct', details: 'Ready for sale' }
      ]
    },
    {
      name: 'Free-Range Country Eggs', category: 'Poultry', price: 90, unit: 'dozen',
      quantity: 100, quality: 'A-Grade', farmer: farmer1._id,
      freshness: 'Collected Today', rating: 4.5, reviews: 15,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
      description: 'Free-range country chicken eggs. Rich yellow yolks.',
      aiSuggestedPrice: 95,
      traceLog: [
        { event: 'Eggs Collected', location: 'Kumar Farm', details: 'Free-range hens' },
        { event: 'Quality Checked', location: 'Farm', details: 'All eggs intact' },
        { event: 'Listed', location: 'Farmer\'s Direct', details: 'Same-day listing' }
      ]
    },
    {
      name: 'Fresh Paneer', category: 'Dairy', price: 280, unit: 'kg',
      quantity: 30, quality: 'A-Grade', farmer: farmer2._id,
      freshness: 'Made Today', rating: 4.8, reviews: 22,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
      description: 'Fresh homemade paneer from pure cow milk. Soft and creamy.',
      aiSuggestedPrice: 300,
      traceLog: [
        { event: 'Milk Collected', location: 'Mysuru', details: 'Pure cow milk, morning batch' },
        { event: 'Paneer Prepared', location: 'Devi Farms Dairy', details: 'Traditional curdling method' },
        { event: 'Listed', location: 'Farmer\'s Direct', details: 'Fresh same-day' }
      ]
    }
  ]);

  console.log(`🌾 Created ${products.length} products`);

  // Create a sample order
  await Order.create({
    consumer: consumer1._id,
    farmer: farmer1._id,
    items: [
      { product: products[0]._id, name: 'Organic Cherry Tomatoes', price: 85, quantity: 3, unit: 'kg' },
      { product: products[2]._id, name: 'Farm Fresh Spinach', price: 40, quantity: 2, unit: 'bunch' }
    ],
    totalAmount: 335,
    platformFee: 17,
    farmerPayout: 318,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentId: 'PAY_SEED_001',
    deliveryAddress: 'HSR Layout, Bangalore',
    deliveredAt: new Date()
  });

  console.log('📦 Created sample order');

  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Login credentials:');
  console.log('   Admin:    admin@farmersdirect.in / admin123');
  console.log('   Farmer:   ravi@farmer.in / farmer123');
  console.log('   Farmer:   lakshmi@farmer.in / farmer123');
  console.log('   Consumer: priya@consumer.in / consumer123\n');

  process.exit(0);
};

seedDB().catch(err => { console.error(err); process.exit(1); });
