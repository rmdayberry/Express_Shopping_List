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
describe("GET /items", async function () {
  test("Get a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

//GET/ items - return a single item
describe("GET / items/:name", async function () {
  test("Get a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if item is not found", async function () {
    const response = await request(app).get(`items/0`);
    expect(response.statusCode).toBe(404);
  });
});

//POST/ items - Add item to list

describe("POST /items", async function () {
  test("Adds a new item", async function () {
    const response = (await request(app).post(`/items`)).setEncoding({
      name: "Avocado",
      price: 1.0,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.name).toEqual("Avocado");
    expe;
    c;
  });
});
