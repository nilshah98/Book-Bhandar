var express = require("express");
var router = express.Router();
var middleware = require('../middleware');
var List = require('../models/list');

router.get("/", middleware.isLoggedIn, function(req,res){
    //res.render("lists/index", {user: req.user});
    List.find({},function(err,allLists){
        if(err){
            console.log(err);
        }else{
            res.render("lists/index", {user: req.user, lists: allLists});
        }
    })
})

router.get("/create", middleware.isLoggedIn, function(req,res){
    //res.send("In list create");
    res.render("lists/create", {user: req.user});
})

router.get("/:id", function(req, res){
    //find the list with provided ID
    List.findById(req.params.id).exec(function(err, foundList){ //populate("comments")
        if(err){
            res.send(err);
        } else {
            //render show template with that list
            res.render("lists/show",{list: foundList});
        }
    });
});

router.post('/',middleware.isLoggedIn, function(req,res,next){
    //get data from form and add to lists array
    //redirect to lists page
    
    var name = req.body.listName;
    var books = req.body.listBooks;
    books = books.split(',');
    console.log(name, books)
    var newList = {listName: name, listBooks: books};

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