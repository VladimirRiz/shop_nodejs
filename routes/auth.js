const express = require('express');

const controllerAuth = require('../controllers/auth');

const router = express.Router();

router.get('/login', controllerAuth.getLogin);

router.post('/login', controllerAuth.postLogin);

router.post('/logout', controllerAuth.postLogout);

router.get('/signup', controllerAuth.getSignUp);

module.exports = router;
