const express = require("express");
const router = new express.Router();
let items = require("../fakeDb");

//GET / items - Get list of items
router.get("/", (req, res) => {
  return res.json(items);
});

//POST- add items to the list
router.post("/", (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) throw new Error("Name and price are required");
    const newItem = { name, price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    next(e);
  }
});

//GET- get a single item by name
router.get("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    return res.json(item);
  } catch (e) {
    next(e);
  }
});
