/**
 * icpUSDRates MongoDB Project
 * Connects to MongoDB, fetches current ICP to USD rate from Internet Computer Dashboard API,
 * and provides API endpoints for saving and updating data in the icpUSDRates collection.
 */

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const icpUSDRatesRoutes = require('./routes/icpUSDRates');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourDbName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(' MongoDB connection error:', err);
});

app.use('/api/icp-usd-rates', icpUSDRatesRoutes);

// Fetch latest ICP-USD rate from Internet Computer public dashboard
app.get('/api/v3/icp-usd-rate', async (req, res) => {
  try {
    const response = await axios.get('https://dashboard.internetcomputer.org/api/v3/icp-usd-rate');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rate from public API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
