const express = require("express");
const router = new express.Router();
let items = require("../fakeDb");
const ExpressError = require("../expressError");

// GET /items - Get list of items
router.get("/", (req, res) => {
  return res.json(items);
});

// POST /items - Add an item to the list
router.post("/", (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || price === undefined)
      throw new ExpressError("Name and price are required", 400);
    const newItem = { name, price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    next(e);
  }
});

// GET /items/:name - Get a single item by name
router.get("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    if (!item) throw new ExpressError("Item not found", 404);
    return res.json(item);
  } catch (e) {
    next(e);
  }
});

// PATCH /items/:name - Update an item
router.patch("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    if (!item) throw new ExpressError("Item not found", 404);

    const { name, price } = req.body;
    if (name) item.name = name;
    if (price !== undefined) item.price = price;

    return res.json({ updated: item });
  } catch (e) {
    next(e);
  }
});

// DELETE /items/:name - Delete an item
router.delete("/:name", (req, res, next) => {
  try {
    const itemIndex = items.findIndex((i) => i.name === req.params.name);
    if (itemIndex === -1) throw new ExpressError("Item not found", 404);

    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
