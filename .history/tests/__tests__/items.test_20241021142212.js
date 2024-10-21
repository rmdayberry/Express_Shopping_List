const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

beforeEach(() => {
  items.length = 0;
  items.push({ name: "firewood", price: 5.0 });
});

describe("GET/items", () => {
  test("Get a lsit of items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "firewood", price: 5.0 }]);
  });
});

descibe("POST /items", () => {
  test("Add an item to the list", async () => {
    const res = await request(app)
      .post("items")
      .send({ name: "avocado", price: 1.0 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "avocado", price: 1.0 } });
  });

  test("Fail to add an item without name or price", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Item not found.");
  });
});

describe("PATCH/items/:name", () => {
  test("Update a single item", async () => {
    const res = await request(app)
      .patch("/items/firewood")
      .send({ name: "new firewood", price: 5.0 });
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ updated: { name: "new firewood", price: 5.0 } });
  });
});

test("Fail to update an item that does not exist", async () => {
  const res = await request(app)
    .patch("/items/nonexistent")
    .send({ name: "new item", price: 5.0 });
  expect(res.statusCode).toBe(500);
  expect(res.body).toBe("Item not found");
});

describe("DELETE /items/:name", () => {
  test("Delete an item", async () => {
    const res = await request(app).delete("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("Fail to delete an item that does not exist", async () => {
    const res = await request(app).delete("/items/nonexistent");
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Item not found.");
  });
});
