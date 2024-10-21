const express = require("express");
const itemsRoutes = require("./routes/items");
const app = express();

//middleware
app.use(express.json());
app.use("/items", itemsRoutes);

// Error handling (middleware)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    error: err.message,
  });
});

module.exports = app;
