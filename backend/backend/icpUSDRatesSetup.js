use yourDbName;

db.createCollection("icpUSDRates");

db.icpUSDRates.insertMany([
  {
    rate: 4.15,
    source: "API",
    createdAt: new Date("2025-06-01T10:00:00Z"),
    updatedAt: new Date("2025-06-01T10:00:00Z")
  },
  {
    rate: 4.20,
    source: "manual-entry",
    createdAt: new Date("2025-06-01T12:00:00Z"),
    updatedAt: new Date("2025-06-01T12:00:00Z")
  }
]);
