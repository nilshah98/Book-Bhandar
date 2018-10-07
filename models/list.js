var mongoose = require('mongoose');

// Linking list to user as foreign key sort of
var listSchema = new mongoose.Schema({
    name: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model("List",listSchema);