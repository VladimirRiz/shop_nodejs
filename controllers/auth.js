exports.getLogin = (req, res, next) => {
  const isLogin = req.get('Cookie').split(';')[1].split('=')[1];
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuth: isLogin,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'isLogin=true');
  res.redirect('/');
};
