require('dotenv').config();
const path = require('path');
const express = require('express');

const csrf = require('csurf');
const csrfProtection = csrf();

const flash = require('connect-flash');

const bodyParser = require('body-parser');
const multer = require('multer');

const mongoose = require('mongoose');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const routerData = require('./routes/admin');
const routerShop = require('./routes/shop');
const routerAuth = require('./routes/auth');

const User = require('./models/user');

const controllerError = require('./controllers/error');

const MONGODB_URI =
  'mongodb+srv://rizian:rizPass@cluster0.h28ps.mongodb.net/shop';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'session',
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.isAuth = req.session.isLogin;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(flash());

app.use('/admin', routerData);
app.use(routerShop);
app.use(routerAuth);

app.get('/500', controllerError.get500);

app.use(controllerError.get404);

app.use((error, req, res, next) => {
  res.redirect('/500');
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
