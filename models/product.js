const getDb = require('../util/database').getDb;

class Product {
  constructor(title, desc, imageUrl, price) {
    this.title = title;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
