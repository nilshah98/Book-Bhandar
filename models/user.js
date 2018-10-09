var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Plugging in passport authentication strategy
UserSchema.plugin(passportLocalMongoose);

// Export the UserSchema, as 'User' model.
// UserSchema has the schema for users, and passport plugged in
module.exports = mongoose.model("User", UserSchema);