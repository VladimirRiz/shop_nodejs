exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuth: true,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLogin = true;
  res.redirect('/');
};
