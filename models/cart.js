const root = require('../util/path');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(root, 'data', 'cart.json');

module.exports = class Cart {
  static addToCard(id, productPrice) {
    console.log(id);
    let cart = { product: [], totalPrice: 0 };
    fs.readFile(dataPath, (err, content) => {
      if (!err) {
        cart = JSON.parse(content);
      }

      const existingIndex = cart.product.findIndex((prod) => prod.id === id);
      const existingProduct = cart.product[existingIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.product = [...cart.product];
        cart.product[existingIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.product = [...cart.product, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
