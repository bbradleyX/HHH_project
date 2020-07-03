const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for users, for now just the name
const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name field is required']
	}
})

//create model for user
const User = mongoose.model('user', UserSchema);

module.exports = User;