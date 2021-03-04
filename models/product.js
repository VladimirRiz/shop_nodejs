const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageURL, desc, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.desc = desc;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (`title`, `price`, `desc`, `imageURL`) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.desc, this.imageURL]
    );
  }

  static deleteProduct(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
