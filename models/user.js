const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = new ObjectId(id);
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCard(product) {
    const db = getDb();
    const UpdatedProduct = { items: [{ ...product, quantity: 1 }] };
    return db
      .collection('users')
      .insertOne({ _id: this._id }, { $set: (this.cart = UpdatedProduct) });
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
