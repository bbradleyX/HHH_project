const express = require ('express')
const Users = require('../models/users');
const Contacts = require ('../models/users/ContactSchema');
const User = require('../models/users');
//const Contacts = require ('../models/users');


//this function gets a list of all the users
//will pass back either data or the error message to the callback function




const getUsers = (callback) => {
	app.get('/user', function(req,res) {
		Users.find({}, function (err, users){
			if (err){
				res.send ('User does not exist');
				next;
			}
			res.json(users);
		});
	})

	app.post('/user', function(req,res) {
		var user_info = new Users(req.body);
		user_info.save(function(err, user_info){
			if (err){
				res.send ('Error saving user info');
				next;
			}
			res.json(user_info);
		});
	})
}

const editUsers = (param, callback) => {
	//Users.update(param, callback)

	app.put (fetch(User, document.getElementById), function(req,res){
		var conditions = {id:req.params.id};
		Users.update(conditions,req.body).then(doc => {
			if (!doc){
				return res.status(404).end();
			}
			return res.status(200).json(doc);
		})
		.catch(err => next (err));
	})
};

const deleteUsers = (param, callback) => {
	//Users.remove(param, callback)

	app.delete('/user/:id', function(req, res) {
		User.findByIdandRemove(req.param.id).exec()
		.then(doc => {
			if(!doc) {
				return res.status(404).end();
			}
			return res.status(200).end();
		})
		.catch(err => next(err));
	})
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
//app.listen(3000)