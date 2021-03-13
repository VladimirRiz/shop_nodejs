const path = require('path');
const express = require('express');

// const bodyParser = require('body-parser');

const routerData = require('./routes/admin');
const routerShop = require('./routes/shop');
const routerAuth = require('./routes/auth');

const mongoose = require('mongoose');

const session = require('express-session');

const User = require('./models/user');

const controllerError = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

app.use((req, res, next) => {
  User.findById('604ba8970ab4c021685ea23a')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', routerData);
app.use(routerShop);
app.use(routerAuth);

app.use(controllerError.get404);

mongoose
  .connect(
    'mongodb+srv://rizian:rizPass@cluster0.h28ps.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Riz',
          email: 'test@email.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
      app.listen(3000);
    });
  })
  .catch((err) => console.log(err));
