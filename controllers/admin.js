const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { name, imageURL, price, desc } = req.body;
  const product = new Product(name, imageURL, desc, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const isEditing = req.query.edit;
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/edit-product',
      product: product,
      editing: isEditing,
    });
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
