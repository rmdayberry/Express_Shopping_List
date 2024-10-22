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
    return res.status(201).json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

//GET- get a single item by name
router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

// PATCH - Update an item
router.patch("/:name", (req, res, next) => {
  try {
    let updatedItem = Item.update(req.params.name, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" }); // Return 404 if item not found
    }
    return res.json({ item: updatedItem }); // Return the updated item
  } catch (err) {
    return next(err);
  }
});

//DELETE- Delete an item
router.delete("/:name", (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
