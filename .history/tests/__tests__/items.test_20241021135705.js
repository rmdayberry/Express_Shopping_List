const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

beforeEach(() => {
  items.length = 0;
  items.push();
});

describe('GET/items',()=>{
  const res= await request(app).get('/items');
})