var express       = require('express');
var bodyParser    = require('body-parser');
var cors          = require('cors');

var User          = require('./models/user');
var Question      = require('./models/question');

var index         = require('./routes/index');
var users         = require('./routes/users');
var questions     = require('./routes/questions');

var mongoose      = require('mongoose');
mongoose.Promise  = global.Promise;
mongoose.connect('mongodb://localhost/stackoverflow')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/', index);
app.use('/user', users);
app.use('/question', questions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
