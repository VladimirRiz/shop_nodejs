const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    privateKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
