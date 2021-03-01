const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routerData = require('./routes/admin');
const routerShop = require('./routes/shop');

const controllerError = require('./controllers/error');
const router = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', routerData);
app.use(routerShop);

app.use(controllerError.get404);

app.listen(3000);
