# icpUSDRates MongoDB Project

This project demonstrates how to create and manage a MongoDB collection named `icpUSDRates`, used to store Internet Computer's ICP to USD exchange rates, with API integration and Express endpoints.

## Features
- Fetches real-time data from the public Internet Computer API: `/api/v3/icp-usd-rate`
- Stores and updates rate data in MongoDB
- Uses Mongoose for schema modeling
- Express.js for REST API endpoints

## Structure

```
backend/
├── app.js
├── models/
│   └── icpUSDRate.js
├── routes/
│   └── icpUSDRates.js
```

## Routes

- `GET /api/v3/icp-usd-rate` – Fetch rate from the Internet Computer public API
- `POST /api/icp-usd-rates` – Add new rate to MongoDB
- `PUT /api/icp-usd-rates/:id` – Update existing rate by ID

## Testing

You can use Postman to test all endpoints. Alternatively, include a `test.js` script to validate functionality automatically.
