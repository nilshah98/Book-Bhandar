var express = require("express");
var router = express.Router();
var middleware = require('../middleware');
var Comment = require('../models/comment');
var List = require('../models/list');

// router.get("/new", middleware.isLoggedIn, function(req, res){
//     List.findById(req.params.id, function(err, list){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("comments/new", {list: list});    
//         }
//     });
// });

router.post("/", middleware.isLoggedIn,function(req, res){
    console.log("HIT IT");
  //lookup Campground using ID
  console.log(req.query);
  console.log(req.params);
  List.findById(req.query.id, function(err, list){
      if(err){
          console.log(err,"XXXXx");
          res.redirect("/lists");
      }else{
          console.log(list);
          //create new comment
          var text = req.body.commentText;
          console.log(text);
          Comment.create({text:text}, function(err, comment){
              if(err){
                  console.log("error", "Something went wrong!");
              } else {
                  console.log(comment);
                  //add Username and Id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  //connect new comment to lists
                  list.comments.push(comment);
                  list.save();
                  //redirect lists show page
                  console.log("success", "Successfully added a comment!");
                  res.redirect("/lists/"+list._id);
              }
          });
      }
  });
});

router.get("/edit", function(req,res){
    console.log("Comments edit");
    var cid = req.query.id;
    Comment.findById(cid, function(err,foundComment){
        if(err){
            console.log(err);
        }else{
            res.render("comment/edit",{ccontent: foundComment});
        }
    })
})

router.post("/edit", function(req,res){
    var cid = req.query.id;
    var text = req.body.commentText;
    
    Comment.findById(cid, function(err,foundComment){
        if(err){
            console.log(err);
        }else{
            foundComment.text = text;
            foundComment.save();
            res.redirect("/lists");
        }
    })
})
module.exports = router;
