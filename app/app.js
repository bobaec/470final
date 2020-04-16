var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logoutRouter = require('./routes/logoutRouter');
var csvRouter = require('./routes/csv');
var histoRouter = require('./routes/histoRouter');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieSession({
	name: 'session',
	keys: ['key1', 'key2']
}))

const db = require('./db.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);
app.use('/saveCSV', csvRouter);
app.use('/histogram', histoRouter);
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

// app.get('/loggedIn', function(req, res) {
// 	res.render('loggedIn');
// })

// app.get('/logout', function(req, res) {
// 	res.render('/');
// })

module.exports = app;
