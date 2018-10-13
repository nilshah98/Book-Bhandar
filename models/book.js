var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    bookName: [String],
    bookAuthor: [String],
    bookISBN: String,
    bookCover: String,
    Subject: [String],
});

module.exports = mongoose.model("Book", bookSchema);