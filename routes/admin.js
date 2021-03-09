const path = require('path');
const express = require('express');

const controllerAdmin = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', controllerAdmin.getAddProduct);

router.post('/add-product', controllerAdmin.postAddProduct);

// router.get('/products', controllerAdmin.getProducts);

// router.get('/edit-product/:productId', controllerAdmin.getEditProduct);

// router.post('/edit-product', controllerAdmin.postEditProduct);

// router.post('/delete', controllerAdmin.postDeleteProduct);

module.exports = router;
