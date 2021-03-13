const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuth: req.session.isLogin,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('604ba8970ab4c021685ea23a')
    .then((user) => {
      req.session.user = user;
      req.session.isLogin = true;
      req.session.save(() => {
        res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
};
