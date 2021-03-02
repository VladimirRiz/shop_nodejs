const path = require('path');
const fs = require('fs');
const root = require('../util/path');

const Cart = require('./cart');

const dataPath = path.join(root, 'data', 'products.json');

const getProductsFromTheFile = (cb) => {
  fs.readFile(dataPath, (err, content) => {
    return err ? cb([]) : cb(JSON.parse(content));
  });
};

module.exports = class Product {
  constructor(id, title, imageURL, desc, price) {
    this.id = id;
    this.name = title;
    this.imageURL = imageURL;
    this.desc = desc;
    this.price = price;
  }

  save() {
    getProductsFromTheFile((products) => {
      if (this.id) {
        const productIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[productIndex] = this;
        fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) =>
          console.log(err)
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(dataPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteProduct(id) {
    getProductsFromTheFile((products) => {
      //   const productIndex = products.findIndex((product) => product.id === id);
      //   const updatedProducts = [...products];
      //   updatedProducts.splice(productIndex, 1);
      const prod = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteCart(id, prod.price);
        }
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromTheFile(cb);
  }

  static findById(id, cb) {
    getProductsFromTheFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }
};
