const getDb = require('../util/database').getDb;

class Product {
  constructor(title, desc, imageUrl, price) {
    this.title = title;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {}
}

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
