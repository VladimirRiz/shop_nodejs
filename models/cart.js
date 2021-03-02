const path = require('path');
const rootDir = require('../util/path');
const fs = require('fs');

const dataPath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addToCart(id, price) {
    fs.readFile(dataPath, (err, content) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(content);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      console.log(existingProductIndex, 'index');
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        console.log(updatedProduct, 'here');
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
