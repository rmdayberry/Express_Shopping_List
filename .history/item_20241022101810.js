const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static findAll() {
    return items;
  }

  static find(name) {
    const foundItem = items.find((item) => item.name === name);
    if (!foundItem) {
      throw { message: "Not Found", status: 404 };
    }
    return foundItem;
  }

  static update(name, data) {
    let foundItem = Item.find(name); // Corrected to use find method
    if (data.name !== undefined) foundItem.name = data.name; // Update name if provided
    if (data.price !== undefined) foundItem.price = data.price; // Update price if provided

    return foundItem; // Return the updated item
  }

  static remove(name) {
    const foundIdx = items.findIndex((item) => item.name === name);
    if (foundIdx === -1) {
      throw { message: "Not Found", status: 404 };
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;
