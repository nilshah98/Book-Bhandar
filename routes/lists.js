var express = require("express");
var router = express.Router();
var middleware = require('../middleware');
var List = require('../models/list');
var axios = require("axios");


// GET ALL LISTS BELONGING TO ANY USER, NO LOGIN REQUIRED -
router.get("/", function(req,res){
    
    // FETCH ALL LISTS, BELONGING TO ANY USER
    List.find({},function(err,allLists){
        if(err){
            console.log(err);
        }else{
            res.render("lists/index", {user: req.user, lists: allLists});
        }
    })
})


// GET FORM TO CREATE A NEW LIST, LOGIN REQUIRED
router.get("/new", middleware.isLoggedIn, function(req,res){
    
    // CREATE A NEW LIST
    res.render("lists/new", {user: req.user});
})

// POST TO CREATE A NEW LIST, LOGIN REQUIRED
router.post('/',middleware.isLoggedIn, function(req,res,next){
    
    var name = req.body.listName;
    var desc = req.body.listDesc;
    var user={
        id: req.user._id,
    };
    
    var newList = {listName: name, listBooks: [], user: user, listDesc: desc};

    List.create(newList, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect('/lists');
        }
    })
});


// GET A SPECIFIC LIST CONTENTS
router.get("/:id", function(req, res){
    var bookList = [];
    var bookData = [];
    var commentData = [];
    // var bookmark= [];
    var counter = 0;
    
    // CALLBACK FUNCTION, TO RENDER ALL CONTENTS OF A LIST
    function reply(foundList, bookData, commentData){
        res.render("lists/show",{list:foundList, data:bookData, commentData:commentData});
    }
    
// FETCH A SINGLE BOOK, BY THE LIST ID
    List.findById(req.params.id).populate("comments").exec(function(err, foundList){
        if(err){
            res.send(err);
        } else {
            bookList = foundList.listBooks;
            commentData = foundList.comments;
            
// ITERATE THROUGH ISBN NUMBERS
            bookList.forEach((bk)=>{
                
// CHECK IF ISBN NUMBER IS NOT A NULL STRING 
            if(bk.length>0){

// SEND A GET REQUEST TO OPENBOOKS API
                axios.get("http://openlibrary.org/search.json",{
                    params:{
                        isbn: bk
                    }
                    })
// IF DATA SUCCESSFULLY RETURNED -
                    .then(function(response){
                        var temp = response["data"]["docs"]
                        
// LOOP THROUGH EACH BOOK OF THE RETURNED DATA, AND CHECK ISBN NUMBER OF TOP ELEM
// IF ISBN NUMBERS MATCH, FOUND ! BREAK
                            for(var book of temp){
                                if(book.isbn != null){
                                    if(book.isbn[0] == bk){
                                        bookData.push(book);
                                        break;
                                    }
                                }
                            }
                        })
                        
// IF ERROR WHILE REQ OR RES FOR THE API, CATCH IT HERE -
                    .catch(function(err){
                        console.log(err)
                    })

// IF NO ERROR, THEN FINALLY, INCREMENT THE COUNTER, AND CHECK IF WHOLE LIST OF ISBN DONE
// IF YES, CALL THE REPLY CALLBACK FUNCTION, TO RENDER ALL DATA OF THE LIST
                    .then(function(){
                        counter++;
                        if(counter == bookList.length){

// RESET COUNTER
                            counter = -1000000000000;
                            reply(foundList,bookData, commentData);
                        }
                    })
                }
            })
        }
    });
});


router.put("/book/add/:id", middleware.isLoggedIn, function(req,res){
    var isbn = req.params.id;
    var listId = req.body.listId;
    List.findOne({_id: listId}, function(err, list){
        if(err){
            console.log(err);
        }else{

// CHECK IF BOOK ALREADY PRESENT IN LIST, IF YES, ADD -
        if(list.listBooks.indexOf(isbn) == -1){
            list.listBooks.push(isbn);
        }

// SAVE THE LIST AFTER UPDATE, AND REDIRECT
        list.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/lists/");            
            }
            
        })
        }
    })
})

router.get("/:id/bookmarks",middleware.isLoggedIn, function(req, res){
    //find and update
    List.findById(req.params.id, function(err, list){
        if(err){
            console.log(err);
            res.redirect("/lists");
        }else{
            console.log("Reached /bookmark part");
            var index=list.bookmark.indexOf(req.user._id)
            if(index < 0){
                list.bookmark.push(req.user._id);
                list.save();
            } else {
                list.bookmark.splice(index, 1);
                list.save();
            }
            //redirect
            console.log("success", "Successfully added a bookmark!");
            res.redirect("/lists/"+req.params.id);
            console.log(req.user._id +" "+req.user.username);
            
            console.log(list.bookmark);
        }
    });
});

router.get("/:id/remove",middleware.isLoggedIn,function(req,res){
    List.findById(req.params.id).remove().exec(function(err, removeList){
        res.redirect("/lists");
    })
})

router.get("/:id/edit", middleware.isLoggedIn, function(req,res){
    var bookList = [];
    var bookData = [];
    var commentData = [];
    var counter = 0;
    
    // CALLBACK FUNCTION, TO RENDER ALL CONTENTS OF A LIST
    function reply(foundList, bookData, commentData){
        res.render("lists/edit",{list:foundList, data:bookData, commentData:commentData});
    }
    
    List.findById(req.params.id).populate("comments").exec(function(err, foundList){
        if(err){
            console.log(err);
        }else{
            if(foundList.user.id.equals(req.user._id)){
                bookList = foundList.listBooks;
                commentData = foundList.comments;
                
    // ITERATE THROUGH ISBN NUMBERS
                bookList.forEach((bk)=>{
                    
    // CHECK IF ISBN NUMBER IS NOT A NULL STRING 
                if(bk.length>0){
    
    // SEND A GET REQUEST TO OPENBOOKS API
                    axios.get("http://openlibrary.org/search.json",{
                        params:{
                            isbn: bk
                        }
                        })
    // IF DATA SUCCESSFULLY RETURNED -
                        .then(function(response){
                            var temp = response["data"]["docs"]
                            
    // LOOP THROUGH EACH BOOK OF THE RETURNED DATA, AND CHECK ISBN NUMBER OF TOP ELEM
    // IF ISBN NUMBERS MATCH, FOUND ! BREAK
                                for(var book of temp){
                                    if(book.isbn != null){
                                        if(book.isbn[0] == bk){
                                            bookData.push(book);
                                            break;
                                        }
                                    }
                                }
                            })
                            
    // IF ERROR WHILE REQ OR RES FOR THE API, CATCH IT HERE -
                        .catch(function(err){
                            console.log(err)
                        })
    
    // IF NO ERROR, THEN FINALLY, INCREMENT THE COUNTER, AND CHECK IF WHOLE LIST OF ISBN DONE
    // IF YES, CALL THE REPLY CALLBACK FUNCTION, TO RENDER ALL DATA OF THE LIST
                        .then(function(){
                            counter++;
                            if(counter == bookList.length){
    
    // RESET COUNTER
                                counter = -1000000000000;
                                reply(foundList,bookData, commentData);
                            }
                        })
                    }
                })
            }else{
                res.render("/");
            }
        }
    })
})

router.get("/:lid/:bid",middleware.isLoggedIn,function(req,res){
    console.log("REACHED !")
    List.findById(req.params.lid, function(err, foundList){
        if(err){
            console.log(err);
        }else{
            var index = foundList.listBooks.indexOf(req.params.bid);
            if(index >= 0){
                foundList.listBooks.splice(index,1);
                foundList.save();
            }
            res.redirect("/lists/"+foundList._id+"/edit");
        }
    })
})

module.exports = router;

module.exports = router;