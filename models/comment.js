var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
    userid: String,
    listid: String,
    content: String,
    like: Number,
    dislike: Number
});

module.exports = mongoose.model("Comment",commentSchema);