var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var passport = require('passport');
var authenticate = require('./authenticate');


//Importing routes
var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customers');
var cafeRouter = require('./routes/cafes');
var PmenuRouter = require('./routes/Pmenu');
var CmenuRouter = require('./routes/Cmenu');
var cartRouter = require('./routes/cartRouter');
var orderRouter = require('./routes/orderRouter');

//Importing models

//Connecting mongodb
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const url = config.mongoUrl;
// const url = 'mongodb://localhost:27017/gspoon';
const connect = mongoose.connect(url, {
  useMongoClient: true
});

connect.then((db) => {
  console.log("Connected correctly to mongo server");
}, (err) => { console.log(err); });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

//Endpoints
app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/cafe', cafeRouter);


app.use(express.static(path.join(__dirname, 'public')));

//other endpoints
app.use('/customer/menu', CmenuRouter);
app.use('/cafe/menu', PmenuRouter);
app.use('/customer/cart', cartRouter);
app.use('/order', orderRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
