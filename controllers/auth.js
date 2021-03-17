require('dotenv').config();

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const S_key =
  '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';

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      user: 'apikey', // <--- keep as is
      pass: S_key, // <--- your api key
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else message = null;
  console.log(message);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }
      return bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLogin = true;
            return req.session.save((err) => {
              res.redirect('/');
            });
          }
          res.redirect('login');
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
};

exports.getSignUp = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else message = null;
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup',
    errorMessage: message,
  });
};

exports.postSignUp = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error', 'This email is exist');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const user = new User({
            email,
            password: hashPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/login');
          let emaili = {
            to: email,
            from: 'my-shop@gmail.com',
            subject: 'You are Sign Up',
            text: 'Hello world',
            html: '<h1>Hooray, You are in!</h1>',
          };
          return transporter.sendMail(emaili, function (err, res) {
            if (err) {
              console.log(err);
            }
            console.log(res);
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
