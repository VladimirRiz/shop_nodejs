const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product-details', shopController.getProduct);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postDeleteProduct);

// router.get('/checkout', shopController.getCheckout);

router.get('/orders', isAuth, shopController.getOrders);

router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;
