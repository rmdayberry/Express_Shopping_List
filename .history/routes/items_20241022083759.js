const Item = require("../item");
const express = require("express");
const router = new express.Router();

//GET / items - Get list of items
router.get("", (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (err) {
    return next(err);
  }
});

//POST- add items to the list
router.post("", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

//GET- get a single item by name
router.get("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    if (!item) throw new Error("Item not found");
    return res.json(item);
  } catch (e) {
    next(e);
  }
});

//PATCH- Update an item
router.patch("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    if (!item) throw new Error("Item not found");

    const { name, price } = req.body;
    if (name) item.name = name;
    if (price !== undefined) item.price = price;

    return res.json({ updated: item });
  } catch (e) {
    next(e);
  }
});

//DELETE- Delete an item
router.delete("/:name", (req, res, next) => {
  try {
    const itemIndex = items.findIndex((i) => i.name === req.params.name);
    if (itemIndex === -1) throw new Error("Item not found");

    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
