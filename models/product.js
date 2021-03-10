const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class Product {
  constructor(title, desc, imageUrl, price, id, userId) {
    this.title = title;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.price = price;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbBase;
    if (this._id) {
      dbBase = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbBase = db.collection('products').insertOne(this);
    }
    return dbBase
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static delete(id) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;
