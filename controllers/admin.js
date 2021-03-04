const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { name, imageURL, price, desc } = req.body;
  const product = new Product(null, name, imageURL, desc, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const isEditing = req.query.edit;
  if (!isEditing) res.redirect('/');
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

exports.postEditProduct = (req, res, next) => {
  const { id, name, imageURL, price, desc } = req.body;
  const updatedProduct = new Product(id, name, imageURL, desc, price);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.deleteProduct(id);
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products, fieldData]) => {
    res.render('admin/product-list', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      prods: products,
    });
  });
};
