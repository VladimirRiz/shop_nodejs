const express = require('express');

const controllerAuth = require('../controllers/auth');

const router = express.Router();

router.get('/login', controllerAuth.getLogin);

router.get('/signup', controllerAuth.getSignUp);

router.get('/reset', controllerAuth.getReset);

router.post('/login', controllerAuth.postLogin);

router.post('/signup', controllerAuth.postSignUp);

router.post('/logout', controllerAuth.postLogout);

router.post('/reset', controllerAuth.postReset);

module.exports = router;
