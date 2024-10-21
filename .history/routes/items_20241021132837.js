const express = require("express");
const router = new express.Router();
let items = require("../fakeDb");

//GET / items - Get list of items
router.get("/", (req, res) => {
  return res.json(items);
});
