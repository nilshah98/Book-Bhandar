var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// MODEL FILES
var User = require('./models/user');
var List = require('./models/list');
var Comment=require("./models/comment");

// ROUTE FILES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listsRouter = require('./routes/lists');
var commentRoutes=require("./routes/comments");

// INIT EXPRESS
var app = express();

// SETUP VIEW ENGINE AND VIEW DIRECTORY
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

// CONNECT MONGOOSE, create a database named as bb
var mongoDB = 'mongodb://127.0.0.1/bb';
mongoose.connect(mongoDB);

// SETUP MONGOOSE PROMISES AS GLOBAL PROMISES
mongoose.Promise = global.Promise;

// ACCESS THE MONGOOSE CONNECTION
var db = mongoose.connection;

// SETTING UP BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SETUP EXPRESS SESSION
app.use(require("express-session")({
  secret:"password",
  resave:false,
  saveUninitialized:false
}));

// SETUP PASSPORT
// INITIALISE PASSPORT & SESSION, done ontop of EXPRESS SESSION
app.use(passport.initialize());
app.use(passport.session());

// DEFINE PASSPORT STRATEGY, in this case, UserSchema is plugged in
passport.use(new LocalStrategy(User.authenticate()));

// SERIALIZE, takes from current user.id and attaches it to request header, under req.session.passport and req.user
passport.serializeUser(User.serializeUser());
// DESERIALIZE, takes id from current request, and searches database for the user
passport.deserializeUser(User.deserializeUser());

// SET UP STATIC FILE ROUTES
app.use(express.static(path.join(__dirname, 'public')));

//  SETUP LOCAL VARS
app.use(function(req, res, next){
  res.locals.currentUser=req.user;
  next();
})


//LINK TO ROUTE FILE
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
// app.use("/lists/:id/comments", commentRoutes);


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

// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server connected!");
// });