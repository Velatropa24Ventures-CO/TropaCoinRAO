const mongoose = require('mongoose');
const icpUSDRate = require('./models/icpUSDRate');

async function run() {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourDbName', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const newRate = new icpUSDRate({
      rate: 4.35,
      source: 'test-script'
    });
    await newRate.save();
    console.log('📥 New rate saved:', newRate);

    const allRates = await icpUSDRate.find();
    console.log('📦 All rates:', allRates);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

run();
