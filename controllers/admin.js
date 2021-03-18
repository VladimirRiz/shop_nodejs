const Product = require('../models/product');

const { validationResult } = require('express-validator');

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
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
    errorMessage: null,
    oldInputs: {
      title: '',
      description: '',
      imageUrl: '',
      price: '',
    },
    validationErrors: [],
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
      editing: false,
      errorMessage: errors.array()[0].msg,
      oldInputs: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      },
      validationErrors: errors.array(),
    });
  }
  const product = new Product({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    userId: req.user,
  });
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
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
      editing: true,
      errorMessage: errors.array()[0].msg,
      product: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        _id: id,
      },
      validationErrors: errors.array(),
    });
  }
  Product.findById(id)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save().then((result) => {
        res.redirect('/admin/products');
      });
    })

    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.deleteOne({ _id: id, userId: req.user._id })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
