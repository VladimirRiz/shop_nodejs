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
    let productIndex;
    if (this.cart) {
      productIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product._id.toString();
      });
    } else productIndex = -1;
    const updatedCartItems = this.cart ? [...this.cart.items] : [];
    let newQuantity = 1;
    if (productIndex >= 0) {
      newQuantity = this.cart.items[productIndex].quantity + 1;
      updatedCartItems[productIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
