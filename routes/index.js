var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req,res){
  res.render('register');
})

router.post('/register', function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req,res,function(){
      res.render("lists/index",{user: req.user},{lists: allLists});
    });
  });
});

router.get('/login', function(req,res,next){
  res.render('login');
})

router.post('/login', passport.authenticate("local",
{
  successRedirect: "/lists",
  failureRedirect: "/login"
}), function(req,res){
  
});

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

module.exports = router;
