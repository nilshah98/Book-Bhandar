var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    listName: String,
    listDesc: String,
    user:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        // username: String
    },
    // comments: [
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ],
    listBooks: [String]              //Array of ISBN numbers
    //bookmark: [String]              //Array of User Id
});

module.exports = mongoose.model("List", listSchema);