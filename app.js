var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// connection to db
if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
// routes
var usertestRouter = require('./routes/testuser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/tests');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/testuser', usertestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
