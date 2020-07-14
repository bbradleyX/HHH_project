const express = require ('express')
const Users = require('../models/users');
const Contacts = require ('../models/users/ContactSchema');
//const Contacts = require ('../models/users');


//this function gets a list of all the users
//will pass back either data or the error message to the callback function
const getUsers = (callback) => {
	try{
		Users.find({}, 'name', callback)
		Users.find({}, 'last_name', callback)
		Users.find({}, 'email', callback)
		Users.find({}, 'phone', callback)

	}
	catch{
		console.error("Please fill in all required information");
	}
};

const editUsers = (param, callback) => {
	Users.update(param, callback)
	Users.update(param, callback)
};

const deleteUsers = (param, callback) => {
	Contacts.create(param, callback)
};

//-------------------------------------------------------------Split----------------------------------------------------------------

const getContacts = (callback) => {
	try{
		Contacts.find({}, 'name', callback)
		Contacts.find({}, 'last_name', callback)
		Contacts.find({}, 'email', callback)
		Contacts.find({}, 'phone', callback)

	}
	catch{
		console.error("Please fill in all required information");
	}
};

const addContacts = (param, callback) => {
	Contacts.create(param, callback)
};

const editContacts = (param, callback) => {
	Contacts.update(name, callback)
	Contacts.update(last_name, callback)
	Contacts.update(, callback)
	Contacts.update(lastname, callback)
};

const deleteContacts = (param, callback) => {
	Contacts.create(param, callback)
};



const queries = {
	//User Functions
	getUsers: getUsers,
	editUsers: editUsers,
	deleteUsers: deleteUsers,

	//Contact Functions
	getContacts: getContacts,
	addContacts: addContacts,
	editContacts: editContacts,
	deleteContacts: deleteContacts
}

module.exports = queries;