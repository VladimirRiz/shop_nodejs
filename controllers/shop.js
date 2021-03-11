const { findById } = require('../models/product');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products,
    });
  });
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts()
//         .then((product) => {
//           res.render('shop/cart', {
//             pageTitle: 'Cart',
//             path: '/cart',
//             products: product,
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// };

exports.postCart = (req, res, next) => {
  const { id } = req.body;
  Product.findById(id)
    .then((product) => {
      return req.user.addToCard(product);
    })
    .then((result) => {
      console.log(result);
      // res.redirect('/cart');
    })
    .catch((err) => console.log(err));
  // let fetchCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchCart = cart;
  //     return cart.getProducts({ where: { id: id } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     if (product) {
  //       let oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(id);
  //   })
  //   .then((product) => {
  //     return fetchCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => res.redirect('/cart'))
  //   .catch((err) => console.log(err));
};

// exports.postDeleteProduct = (req, res, next) => {
//   const { id } = req.body;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: id } });
//     })
//     .then(([product]) => {
//       return product.cartItem.destroy();
//     })
//     .then((result) => {
//       res.redirect('/cart');
//     })
//     .catch((err) => console.log(err));
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('shop/product-list', {
      pageTitle: 'Products',
      path: '/products',
      prods: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-details', {
        pageTitle: `Product ${product.title}`,
        product: product,
        path: false,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ['products'] })
//     .then((orders) => {
//       res.render('shop/orders', {
//         pageTitle: 'Orders',
//         path: '/orders',
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProduct(
//             products.map((product) => {
//               products.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((result) => {
//       fetchedCart.setProducts(null);
//       res.redirect('/orders');
//     })
//     .catch((err) => console.log(err));
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', { pageTitle: 'Checkout', path: 'checkout' });
// };
