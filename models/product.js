const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageURL, desc, price) {
    this.id = id;
    this.name = title;
    this.imageURL = imageURL;
    this.desc = desc;
    this.price = price;
  }

  save() {}

  static deleteProduct(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {}
};
