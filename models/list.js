var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    name: String,
    description: String,
// Contains ISBN numbers -
    books: [String],
// Contains user as foreign key -
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model("List",listSchema);