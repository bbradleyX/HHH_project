const express = require ('express')
const Users = require('../models/users');
const Contacts = require ('../models/users/ContactSchema');
//const Contacts = require ('../models/users');


//this function gets a list of all the users
//will pass back either data or the error message to the callback function
const getUsers = (callback) => {
	Users.find({}, 'name', callback);
	Users.find({}, 'last_name', callback);
	Users.find({}, 'email', callback);
 	Users.find({}, 'phone', callback);

	let a1 = [name, last_name,email,phone];
	a1.sort();
	
	async function catchUserInfo(){
		const response = await fetch(a1.values);
		const data = await response.json();
		document.getElementById(a1.toString).src = URL.createObjectURL(json);
	}

	catchUserInfo().catch(error => {
		console.log ('User does not exist');
		console.error (error);
	});
};

const editUsers = (param, callback) => {
	Users.update(param, callback)
	Users.update(param, callback)
};

const deleteUsers = (param, callback) => {
	Users.remove(param, callback)
};

//------------------------------------------------------------Collection Split-----------------------------------------------------------

const getContacts = (callback) => {
	try{
		Contacts.find({}, 'name', callback)
		Contacts.find({}, 'last_name', callback)
		Contacts.find({}, 'category', callback)
		Contacts.find({}, 'contact_method', callback)

	}
	catch{
		console.error("Contact does not exist");
	}
};

const addContacts = (param, callback) => {
	Contacts.create(name, callback)
	Contacts.create(last_name, callback)
	Contacts.create(category, callback)
	Contacts.create(contact_method, callback)
};

const editContacts = (param, callback) => {
	Contacts.update(name, callback)
	Contacts.update(last_name, callback)
	Contacts.update(category, callback)
	Contacts.update(method, callback)
};

const deleteContacts = (param, callback) => {
	Contacts.remove(param, callback)
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