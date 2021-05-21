// How to deploy a React + Node app to Heroku in 3 minutes without the command line
// https://www.freecodecamp.org/news/deploy-a-react-node-app-to/amp/
// Sample project:
// https://github.com/iqbal125/react-express-sample

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// Serves all our static files from the build directory. 
app.use(express.static(path.join(__dirname, 'build')));

// Keep our client side routing functional. This code essentially serves the index.html file on any unknown routes. Otherwise we would need to rewrite our entire routing to work with this Express server setup. 
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
