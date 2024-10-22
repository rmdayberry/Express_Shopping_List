process.env.NODE_ENV = "test";

const request = require("supertest");
const express = require("express");
const app = require("../app");

let items = require("../fakeDb");
let item = { name: "firewood", price: 5.0 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

// GET /items - Get list of items
describe("GET /items", function () {
  test("Get a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items: fetchedItems } = response.body; // Renamed variable for clarity
    expect(response.statusCode).toBe(200);
    expect(fetchedItems).toHaveLength(1); // Changed to fetchedItems
  });
});

// GET /items/:name - return a single item
describe("GET /items/:name", function () {
  test("Get a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if item is not found", async function () {
    const response = await request(app).get(`/items/nonexistent`);
    expect(response.statusCode).toBe(404);
  });
});

// POST /items - Add item to list
describe("POST /items", function () {
  test("Adds a new item", async function () {
    const response = await request(app).post(`/items`).send({
      name: "Avocado",
      price: 1.0,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("Avocado");
    expect(response.body.item.price).toEqual(1.0);
  });
});

// PATCH /items/:name - Update an item
describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const response = await request(app).patch(`/items/firewood`).send({
      name: "Arugula",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "Arugula",
    });
  });

  test("Gives 404 code if item not found", async function () {
    const response = await request(app).patch(`/items/nonexistent`).send({
      name: "New Item",
    }); // Removed parentheses here
    expect(response.statusCode).toBe(404);
  });
});

// DELETE /items/:name - Delete a single item from list
describe("DELETE /items/:name", function () {
  test("Deletes a single item from list", async function () {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Deleted",
    });
  });
});
