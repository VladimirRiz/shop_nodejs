const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routerData = require('./routes/admin');
const routerShop = require('./routes/shop');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

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

app.use('/admin', routerData);
app.use(routerShop);

app.use(controllerError.get404);

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((res) => {
    // console.log(res);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
