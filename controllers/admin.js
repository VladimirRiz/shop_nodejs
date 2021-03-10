const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/product-list', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, desc } = req.body;
  const product = new Product(title, desc, imageUrl, price, null, req.user._id);
  product
    .save()
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const isEditing = req.query.edit;
  if (!isEditing) res.redirect('/');
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/edit-product',
        product: product,
        editing: isEditing,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, desc } = req.body;
  const product = new Product(title, desc, imageUrl, price, id);
  product
    .save()
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.delete(id)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
