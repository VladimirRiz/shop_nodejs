const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const { name, imageURL, price, desc } = req.body;
  const product = new Product(name, imageURL, desc, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  res.render('edit/edit-product', {
    pageTitle: 'Edit Product',
    path: '/edit-product',
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/product-list', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      prods: products,
    });
  });
};
