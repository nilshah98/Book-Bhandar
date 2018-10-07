var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    name: String,
    // user:{
    //     id:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // },
    // comments: [
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ],
    listbooks: [String],              //Array of ISBN numbers
    //bookmark: [String]              //Array of User Id
});

module.exports = mongoose.model("List",listSchema);