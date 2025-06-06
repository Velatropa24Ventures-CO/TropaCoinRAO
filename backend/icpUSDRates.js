const express = require('express');
const router = express.Router();
const icpUSDRate = require('../models/icpUSDRate');

router.post('/', async (req, res) => {
  try {
    const { rate, source } = req.body;
    const newRate = new icpUSDRate({ rate, source });
    const savedRate = await newRate.save();
    res.status(201).json(savedRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRate = await icpUSDRate.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(updatedRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
