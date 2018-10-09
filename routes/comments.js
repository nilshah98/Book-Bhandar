// var express = require("express");
// var router = express.Router();
// var middleware = require('../middleware');
// var Comment = require('../models/comment');
// var List = require('../models/list');

// router.get("/new", middleware.isLoggedIn, function(req, res){
//     List.findById(req.params.id, function(err, list){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("comments/new", {list: list});    
//         }
//     });
// });

// router.post("/", middleware.isLoggedIn, function(req, res){
//   //lookup Campground using ID
//   List.findById(req.params.id, function(err, list){
//       if(err){
//           console.log(err);
//           res.redirect("/lists");
//       }else{
//           //create new comment
//           Comment.create(req.body.comment, function(err, comment){
//               if(err){
//                   console.log("error", "Something went wrong!");
//               } else {
//                   //add Username and Id to comment
//                   comment.author.id = req.user._id;
//                   comment.author.username = req.user.username;
//                   comment.save();
//                   //connect new comment to campground
//                   list.comments.push(comment);
//                   list.save();
//                   //redirect campground show page
//                   console.log("success", "Successfully added a comment!");
//                   res.redirect("/lists/"+list._id);
//               }
//           });
//       }
//   });
// });
