var express = require("express");
var router = express.Router();
var middleware = require('../middleware');

router.get("/", middleware.isLoggedIn, function(req,res){
    res.render("lists/index", {user: req.user});
})

router.get("/lists/create", middleware.isLoggedIn, function(req,res){
    res.send("In list create");
    // res.render("lists/create", {user: req.user});
})


router.post('/lists',middleware.isLoggedIn, function(req,res,next){
    //get data from form and add to lists array
    //redirect to lists page
    
    var name = req.body.listName;
    var books = req.body.listBooks;
    books = books.split(',');
    console.log(name, books)
    var newList = {name: name, listBooks: books};
    List.create(newList, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect('/lists');
        }
    })
});


module.exports = router;