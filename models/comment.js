var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    text: String,
    // like: Number,
    // dislike: Number
});

module.exports = mongoose.model("Comment",commentSchema);