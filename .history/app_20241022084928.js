const express = require("express");
const itemsRoutes = require("./routes/items");
const app = express();
const ExpressError = require("./expressError");

//middleware
app.use(express.json());
app.use("/items", itemsRoutes);

//404 handle
app.use((req, res, next) => {
  return new ExpressError("Not Found", 404);
});

// Error handling general (middleware)
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
