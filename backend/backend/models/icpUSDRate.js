const mongoose = require('mongoose');

const icpUSDRateSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    default: 'API'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('icpUSDRate', icpUSDRateSchema);
