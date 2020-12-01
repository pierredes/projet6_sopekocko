const mongoose = require('mongoose');
const userValidator = require('mongoose-unique-validator');

const user = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

user.plugin(userValidator);

module.exports = mongoose.model('User', user);