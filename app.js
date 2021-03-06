const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routerData = require('./routes/admin');
const routerShop = require('./routes/shop');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const controllerError = require('./controllers/error');

const app = express();

// db.execute('SELECT * FROM products')
//   .then((res) => {
//     console.log(res[0]);
//   })
//   .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', routerData);
app.use(routerShop);

app.use(controllerError.get404);

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then((res) => {
    return User.findByPk(1);
    // console.log(res);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Riz', email: 'riz@gmail.com' });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
