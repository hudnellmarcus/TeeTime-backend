// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    handicap: Number
});


// User Model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;