const mongoose = require('mongoose');

// Creates the Schema for the User
const UserSchema = new mongoose.Schema( {
    username: {type: String, unique: true},
    password: String,
    salt: String,
    schedule: Array,
}, {timestamps: true})

//Assign the schema to the model
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;