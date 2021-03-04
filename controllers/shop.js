const { findById } = require('../models/product');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products,
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      if (cart) {
        for (product of products) {
          const cartProductsData = cart.products.find(
            (prod) => prod.id === product.id
          );
          if (cartProductsData) {
            cartProducts.push({
              product: product,
              prodQty: cartProductsData.qty,
            });
          }
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId, (product) => {
    Cart.addToCart(product.id, product.price);
  });
  res.redirect('/cart');
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.findById(id, (product) => {
    Cart.deleteCart(id, product.price);
    res.redirect('/cart');
  });
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      pageTitle: 'Products',
      path: '/products',
      prods: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-details', {
        pageTitle: `Product ${product.title}`,
        product: product,
        path: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: 'checkout' });
};
