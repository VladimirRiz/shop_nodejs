const express = require('express');

const controllerAuth = require('../controllers/auth');

const router = express.Router();

router.get('/login', controllerAuth.getLogin);

router.get('/signup', controllerAuth.getSignUp);

router.post('/login', controllerAuth.postLogin);

router.post('/signup', controllerAuth.postSignUp);

router.post('/logout', controllerAuth.postLogout);

module.exports = router;
