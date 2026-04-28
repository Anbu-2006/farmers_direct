const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

const connectDB = async () => {
  try {
    // Try local/Atlas MongoDB first
    if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('localhost')) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ MongoDB Connected: Atlas Cloud`);
      return;
    }

    // Fallback: In-memory MongoDB (zero install, works everywhere)
    console.log('⏳ Starting in-memory MongoDB...');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: In-Memory (${uri})`);
    console.log('💡 Data will reset on restart. Use MongoDB Atlas for persistence.');

  } catch (err) {
    console.error(`❌ MongoDB Error: ${err.message}`);
    process.exit(1);
  }
};

// Cleanup on exit
process.on('SIGINT', async () => {
  if (mongod) await mongod.stop();
  process.exit(0);
});

module.exports = connectDB;
