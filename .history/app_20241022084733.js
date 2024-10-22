const express = require("express");
const itemsRoutes = require("./routes/items");
const app = express();
const ExpressError = require("");

//middleware
app.use(express.json());
app.use("/items", itemsRoutes);

//404 handle
app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

// Error handling (middleware)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    error: message,
  });
});

module.exports = app;
