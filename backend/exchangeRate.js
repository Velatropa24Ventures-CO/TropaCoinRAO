// models/exchangeRate.js
const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  currencyPair: {
    type: String,
    required: [true, 'Currency pair is required'],
    match: [/^[A-Z]{3}\/[A-Z]{3}$/, 'Currency pair must be in the format XXX/YYY']
  },
  rate: {
    type: Number,
    required: [true, 'Exchange rate is required'],
    min: [0, 'Rate must be a positive number']
  },
  source: {
    type: String,
    default: 'API'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Method to convert an amount using this exchange rate
exchangeRateSchema.methods.convert = function(amount) {
  if (amount < 0) {
    throw new Error('Amount must be non-negative');
  }
  return amount * this.rate;
};

// Static method to find an entry by ID
exchangeRateSchema.statics.findByRateId = function(id) {
  return this.findById(id);
};

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
