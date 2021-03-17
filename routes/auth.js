const express = require('express');

const controllerAuth = require('../controllers/auth');

const router = express.Router();

router.get('/login', controllerAuth.getLogin);

router.get('/signup', controllerAuth.getSignUp);

router.get('/reset', controllerAuth.getReset);

router.get('/reset/:token', controllerAuth.getNewPassword);

router.post('/login', controllerAuth.postLogin);

router.post('/signup', controllerAuth.postSignUp);

router.post('/logout', controllerAuth.postLogout);

router.post('/reset', controllerAuth.postReset);

router.post('/new-password/', controllerAuth.postNewPassword);

module.exports = router;
