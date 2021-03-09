const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, desc } = req.body;
  const product = new Product(title, desc, imageUrl, price);
  product
    .save()
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const isEditing = req.query.edit;
//   if (!isEditing) res.redirect('/');
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } })
//     // Product.findByPk(prodId)
//     .then(([product]) => {
//       console.log(product);
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/edit-product',
//         product: product,
//         editing: isEditing,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const { id, title, imageUrl, price, desc } = req.body;
//   Product.findByPk(id)
//     .then((product) => {
//       product.title = title;
//       product.imageUrl = imageUrl;
//       product.price = price;
//       product.desc = desc;
//       return product.save();
//     })
//     .then((result) => {
//       res.redirect('/admin/products');
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const { id } = req.body;
//   Product.findByPk(id)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       res.redirect('/admin/products');
//     })
//     .catch((err) => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render('admin/product-list', {
//         pageTitle: 'Admin Products',
//         path: '/admin/products',
//         prods: products,
//       });
//     })
//     .catch((err) => console.log(err));
// };
