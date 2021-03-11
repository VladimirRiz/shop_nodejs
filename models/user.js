const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCard(product) {
    const db = getDb();
    const UpdatedProduct = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: (this.cart = UpdatedProduct) }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
