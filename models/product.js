const path = require('path');
const fs = require('fs');
const root = require('../util/path');

const dataPath = path.join(root, 'data', 'products.json');

const getProductsFromTheFile = (cb) => {
  fs.readFile(dataPath, (err, content) => {
    return err ? cb([]) : cb(JSON.parse(content));
  });
};

module.exports = class Product {
  constructor(title, imageURL, desc, price) {
    this.name = title;
    (this.imageURL = imageURL), (this.desc = desc), (this.price = price);
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromTheFile((products) => {
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromTheFile(cb);
  }
};
