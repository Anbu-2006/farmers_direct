const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

module.exports = async function seedData() {
  try {
    const admin = await User.create({ name: 'Admin', email: 'admin@farmersdirect.in', password: 'admin123', role: 'admin' });

    const farmer1 = await User.create({
      name: 'Ravi Kumar', email: 'ravi@farmer.in', password: 'farmer123',
      role: 'farmer', farmName: 'Kumar Organic Farm', location: 'Tumkur, Karnataka', isVerified: true
    });

    const farmer2 = await User.create({
      name: 'Lakshmi Devi', email: 'lakshmi@farmer.in', password: 'farmer123',
      role: 'farmer', farmName: 'Devi Natural Farms', location: 'Mysuru, Karnataka', isVerified: true
    });

    const consumer1 = await User.create({
      name: 'Priya Sharma', email: 'priya@consumer.in', password: 'consumer123', role: 'consumer', location: 'Bangalore'
    });

    const products = await Product.insertMany([
      {
        name: 'Organic Cherry Tomatoes', category: 'Vegetables', price: 85, unit: 'kg',
        quantity: 200, quality: 'Organic', isOrganic: true, farmer: farmer1._id,
        freshness: 'Harvested Today', rating: 4.8, reviews: 24,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
        aiSuggestedPrice: 90,
        traceLog: [
          { event: 'Seeds Planted', location: 'Tumkur', details: 'Organic heirloom seeds' },
          { event: 'Crop Harvested', location: 'Kumar Farm', details: 'Hand-picked' },
          { event: 'Quality Checked', location: 'Farm Gate', details: 'A-Grade, No pesticides' },
          { event: 'Listed', location: "Farmer's Direct", details: 'Available for purchase' }
        ]
      },
      {
        name: 'Fresh Alphonso Mangoes', category: 'Fruits', price: 320, unit: 'dozen',
        quantity: 50, quality: 'A-Grade', farmer: farmer2._id,
        freshness: 'Picked Yesterday', rating: 4.9, reviews: 42,
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
        aiSuggestedPrice: 350,
        traceLog: [
          { event: 'Tree Cultivated', location: 'Mysuru', details: '12-year Alphonso trees' },
          { event: 'Harvested', location: 'Devi Farms', details: 'Naturally ripened' },
          { event: 'Listed', location: "Farmer's Direct", details: 'Available' }
        ]
      },
      {
        name: 'Farm Fresh Spinach', category: 'Greens', price: 40, unit: 'bunch',
        quantity: 150, quality: 'A-Grade', farmer: farmer1._id,
        freshness: 'Harvested Today', rating: 4.6, reviews: 18,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
        aiSuggestedPrice: 45,
        traceLog: [{ event: 'Harvested & Listed', location: 'Kumar Farm', details: 'Morning harvest' }]
      },
      {
        name: 'Red Chilli Powder', category: 'Spices', price: 180, unit: 'kg',
        quantity: 80, quality: 'A-Grade', farmer: farmer2._id,
        freshness: 'Sun-Dried & Ground', rating: 4.7, reviews: 31,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
        aiSuggestedPrice: 200,
        traceLog: [
          { event: 'Chillies Harvested', location: 'Mysuru', details: 'Guntur variety' },
          { event: 'Sun Dried & Ground', location: 'Local Mill', details: 'Traditional method' }
        ]
      },
      {
        name: 'Free-Range Country Eggs', category: 'Poultry', price: 90, unit: 'dozen',
        quantity: 100, quality: 'A-Grade', farmer: farmer1._id,
        freshness: 'Collected Today', rating: 4.5, reviews: 15,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
        aiSuggestedPrice: 95,
        traceLog: [{ event: 'Collected & Listed', location: 'Kumar Farm', details: 'Free-range hens' }]
      },
      {
        name: 'Fresh Paneer', category: 'Dairy', price: 280, unit: 'kg',
        quantity: 30, quality: 'A-Grade', farmer: farmer2._id,
        freshness: 'Made Today', rating: 4.8, reviews: 22,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
        aiSuggestedPrice: 300,
        traceLog: [
          { event: 'Milk Collected', location: 'Mysuru', details: 'Pure cow milk' },
          { event: 'Paneer Prepared', location: 'Devi Dairy', details: 'Traditional method' }
        ]
      }
    ]);

    await Order.create({
      consumer: consumer1._id, farmer: farmer1._id,
      items: [
        { product: products[0]._id, name: 'Organic Cherry Tomatoes', price: 85, quantity: 3, unit: 'kg' },
        { product: products[2]._id, name: 'Farm Fresh Spinach', price: 40, quantity: 2, unit: 'bunch' }
      ],
      totalAmount: 335, platformFee: 17, farmerPayout: 318,
      status: 'delivered', paymentStatus: 'paid', paymentId: 'PAY_SEED_001',
      deliveryAddress: 'HSR Layout, Bangalore', deliveredAt: new Date()
    });

    console.log('✅ Auto-seeded: 1 admin, 2 farmers, 1 consumer, 6 products, 1 order');
    console.log('📋 Logins: admin@farmersdirect.in/admin123 | ravi@farmer.in/farmer123 | priya@consumer.in/consumer123');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
};
