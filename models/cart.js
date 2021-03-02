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
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteCart(id, price) {
    fs.readFile(dataPath, (err, content) => {
      if (err) return;
      let cart;
      const updatedCart = { ...JSON.parse(content) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (product) {
        const totalProductPrice = product.qty * price;
        updatedCart.totalPrice = updatedCart.totalPrice - totalProductPrice;
        updatedCart.products = updatedCart.products.filter(
          (prod) => prod.id !== id
        );
        fs.writeFile(dataPath, JSON.stringify(updatedCart), (err) =>
          console.log(err)
        );
      }
    });
  }
};
