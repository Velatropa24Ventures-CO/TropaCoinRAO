// routes/exchangeRates.js
const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/exchangeRate');

// POST - Create a new exchange rate entry
router.post('/', async (req, res) => {
  try {
    const { currencyPair, rate, source } = req.body;
    const newRate = new ExchangeRate({ currencyPair, rate, source });
    const savedRate = await newRate.save();
    res.status(201).json(savedRate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Update exchange rate by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRate = await ExchangeRate.findByIdAndUpdate(
      req.params.id,
      { ...req.body, timestamp: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedRate) {
      return res.status(404).json({ error: 'Exchange rate not found' });
    }
    res.json(updatedRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Retrieve all exchange rates
router.get('/', async (req, res) => {
  try {
    const rates = await ExchangeRate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Retrieve a specific exchange rate by ID
router.get('/:id', async (req, res) => {
  try {
    const rate = await ExchangeRate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ error: 'Exchange rate not found' });
    }
    res.json(rate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
