const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const routerData = require('./routes/admin');
const routerShop = require('./routes/shop');

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

// const User = require('./models/user');

const controllerError = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('6049309f05cf34a8050fd093')
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use('/admin', routerData);
app.use(routerShop);

app.use(controllerError.get404);

mongoose
  .connect(
    'mongodb+srv://rizian:rizPass@cluster0.h28ps.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
