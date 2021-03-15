const path = require('path');
const express = require('express');

const controllerAdmin = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, controllerAdmin.getAddProduct);

router.post('/add-product', isAuth, controllerAdmin.postAddProduct);

router.get('/products', isAuth, controllerAdmin.getProducts);

router.get('/edit-product/:productId', isAuth, controllerAdmin.getEditProduct);

router.post('/edit-product', isAuth, controllerAdmin.postEditProduct);

router.post('/delete', isAuth, controllerAdmin.postDeleteProduct);

module.exports = router;
