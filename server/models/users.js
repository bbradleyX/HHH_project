const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LogSchema = new Schema({
	date: {
		type: Date,
		required: [true, 'putting in a date is required']
	},

	notes: String
})

const ContactSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name field is required']
	},

	last_name: {
		type: String,
		required: [true, 'last name required']
	},

	category: {
		enum: ['Friend', 'Family', 'Professional'],
	},

	general_notes: {
		type: String
	},

	contact_method: {
		enum: ['Text', 'Messanger', 'Email', 'Call']
	},

	email: String,

	phone_number: Number,

	Logs: [LogSchema]
})

//create schema for users, for now just the name
const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name field is required']
	},

	last_name: {
		type: String,
		required: [true, 'last name is required']
	},

	email: {
		type: String,
		required: [true, 'email is required']
	},
	
	//validate somehow later
	//true vs false??
	phone_number: Number,

	contacts: [ContactSchema]
})


//create model for user
const User = mongoose.model('user', UserSchema);

module.exports = User;