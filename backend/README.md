# icpUSDRates MongoDB Project

This project implements the following functionality:

- Creates an `icpUSDRates` collection in MongoDB to store POST and PUT requests.
- Maps the MongoDB data using Mongoose ODM for use as JavaScript objects.
- Defines an `exchangeRate` Mongoose schema with validation and a custom method.
- Sets up an `ExchangeRate` model to access entries by ID.
- Implements Express routes for POST and PUT requests to interact with the API.

## Files Included

- `app.js` – Sets up Express server and connects to MongoDB.
- `models/icpUSDRate.js` – Mongoose schema for storing ICP to USD rates.
- `models/exchangeRate.js` – Mongoose schema for exchange rates with validation and methods.
- `routes/icpUSDRates.js` – Express routes to POST and PUT ICP to USD rates.
- `routes/exchangeRates.js` – Express routes to POST and PUT exchange rates.
- `test.js` – Sample script demonstrating Mongoose model usage.
