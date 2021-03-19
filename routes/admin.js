const path = require('path');
const express = require('express');

const { check, body } = require('express-validator');

const controllerAdmin = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, controllerAdmin.getAddProduct);

router.post(
  '/add-product',
  isAuth,
  [
    body('title').isString().isLength({ min: 4 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 200 }).trim(),
  ],
  controllerAdmin.postAddProduct
);

router.get('/products', isAuth, controllerAdmin.getProducts);

router.get('/edit-product/:productId', isAuth, controllerAdmin.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title').isString().isLength({ min: 4 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 200 }).trim(),
  ],
  isAuth,
  controllerAdmin.postEditProduct
);

router.post('/delete', isAuth, controllerAdmin.postDeleteProduct);

module.exports = router;
