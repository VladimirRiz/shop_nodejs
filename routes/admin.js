const path = require('path');
const express = require('express');

const controllerAdmin = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', controllerAdmin.getAddProduct);

router.post('/add-product', controllerAdmin.postAddProduct);

router.get('/products', controllerAdmin.getProducts);

module.exports = router;
