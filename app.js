const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

// const routerData = require('./routes/admin');
// const routerShop = require('./routes/shop');

const mongoConnect = require('./util/database');

const controllerError = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

// app.use('/admin', routerData);
// app.use(routerShop);

// app.use(controllerError.get404);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
