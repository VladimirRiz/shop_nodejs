const { findById } = require('../models/product');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { pageTitle: 'Card', path: '/card' });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      pageTitle: 'Products',
      path: '/products',
      prods: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    const { name, imageURL, desc, price } = product;
    res.render('shop/product-details', {
      pageTitle: `Product ${name}`,
      title: name,
      image: imageURL,
      price,
      desc,
      path: false,
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: 'checkout' });
};
