const express = require('express');

const controllerAuth = require('../controllers/auth');

const router = express.Router();

router.get('/login', controllerAuth.getLogin);

router.post('/login', controllerAuth.postLogin);

module.exports = router;
