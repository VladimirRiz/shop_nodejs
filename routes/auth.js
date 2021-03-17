const express = require('express');

const { check, body } = require('express-validator');

const User = require('../models/user');
const bcrypt = require('bcryptjs');

const controllerAuth = require('../controllers/auth');

const router = express.Router();

router.get('/login', controllerAuth.getLogin);

router.get('/signup', controllerAuth.getSignUp);

router.get('/reset', controllerAuth.getReset);

router.get('/reset/:token', controllerAuth.getNewPassword);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password', 'Wrong password').isLength({ min: 5 }).trim(),
  ],
  controllerAuth.postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('This email is already exist');
          }
        });
      }).normalizeEmail,
    body('password', 'Enter a password at least with 5 characters ')
      .isLength({
        min: 5,
      })
      .trim(),
    body('confirmPassword')
      .custom((value, { req }) => {
        console.log(value === req.body.password);
        if (value !== req.body.password) {
          throw new Error('Passwords have to much!');
        }
        return true;
      })
      .trim(),
  ],
  controllerAuth.postSignUp
);

router.post('/logout', controllerAuth.postLogout);

router.post('/reset', controllerAuth.postReset);

router.post('/new-password/', controllerAuth.postNewPassword);

module.exports = router;
