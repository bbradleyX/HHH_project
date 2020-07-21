const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionTypes = ["Friend", "Family", "Professional"]
//1 = every day, 2 = every 3 days, 3 = every week, 4 = every 2 weeks,
//5 = every 3 weeks, 6 = every month, 7 = every 2 months
const frequency = ['1', '2', '3', '4', '5', '6', '7']

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
		type: String, 
		enum: connectionTypes,
		required: [true, 'connection type is required']
	},

	frequency: {
		type: String,
		enum: frequency,
		required: [true, 'connection frequency is required']
	},

	general_notes: {
		type: String
	},

	contact_method: {
		type: String
	},

	email: String,

	phone_number: String,

	logs: [LogSchema]
})

//create schema for users, for now just the name
const UserSchema = new Schema({
	googleid: {
		type: String,
		required: true
	},
	
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
//module.exports = Contact;