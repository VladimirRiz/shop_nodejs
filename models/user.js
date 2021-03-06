const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: String,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCard = function (product) {
  const productIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (productIndex >= 0) {
    newQuantity = this.cart.items[productIndex].quantity + 1;
    updatedCartItems[productIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (id) {
  const updatedCart = this.cart.items.filter(
    (item) => item.productId.toString() !== id.toString()
  );
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = {
    items: [],
  };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCard(product) {
//     let productIndex;
//     if (this.cart) {
//       productIndex = this.cart.items.findIndex((cp) => {
//         return cp.productId.toString() === product._id.toString();
//       });
//     } else productIndex = -1;
//     const updatedCartItems = this.cart ? [...this.cart.items] : [];
//     let newQuantity = 1;
//     if (productIndex >= 0) {
//       newQuantity = this.cart.items[productIndex].quantity + 1;
//       updatedCartItems[productIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }
//     const updatedCart = { items: updatedCartItems };
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productsId = this.cart.items.map((item) => item.productId);
//     return db
//       .collection('products')
//       .find({ _id: { $in: productsId } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((item) => {
//               return item.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         // })
//       })
//       .catch((err) => console.log(err));
//   }

//   deleteItemFromCart(id) {
//     const updatedCartItems = this.cart.items.filter(
//       (item) => item.productId.toString() !== id.toString()
//     );
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: new ObjectId(userId) });
//   }
// }

// module.exports = User;
