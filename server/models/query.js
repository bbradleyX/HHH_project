const express = require ('express')
const Users = require('../models/users');
const Contacts = require ('../models/users/ContactSchema');
//const Contacts = require ('../models/users');


//this function gets a list of all the users
//will pass back either data or the error message to the callback function
const getUsers = app.get('/users', function(req,res) {
		Users.find({}, function (err, users){
			if (err){
				res.send ('User does not exist');
				next;
			}
			res.json(users);
		});

	app.post('/users', function(req,res) {
		var user_info = new Users(req.body);
		user_info.save(function(err, user_info){
			if (err){
				res.send ('Error saving user info');
				next;
			}
			res.json(user_info);
		});
	})
})

const editUsers = app.put (fetch(User, document.getElementById), function(req,res) {
	//Users.update(param, callback)
	var conditions = {id:req.params.id};
	Users.update(conditions,req.body).then(doc => {
		if (!doc){
			return res.status(404).end();
		}
		return res.status(200).json(doc);
	})
	.catch(err => next (err));
})

const deleteUsers = app.delete('/users/:id', function(req, res) {
	//Users.remove(param, callback)
		User.findByIdandRemove(req.param.id).exec()
		.then(doc => {
			if(!doc) {
				return res.status(404).end();
			}
			return res.status(200).end();
		})
		.catch(err => next(err));
	})

//------------------------------------------------------------Collection Split-----------------------------------------------------------

const getContacts = app.get('/contacts/', function(req,res) {
	Users.find({}, function (err, contacts){
		if (err){
			res.send ('Contact does not exist');
			next;
		}
		res.json(contacts);
	});

app.post('/contacts', function(req,res) {
	var contact_info = new Contacts(req.body);
	user_info.save(function(err, contact_info){
		if (err){
			res.send ('Error saving us contact fo');
			next;
		}
		res.json(contact_info);
	});
})
})


const addContacts = (param, callback) => {
	//Contacts.create(name, callback)
	Contacts.create(last_name, callback)
	Contacts.create(category, callback)
	Contacts.create(contact_method, callback)
};

const editContacts = app.put (fetch(Contacts, document.getElementById), function(req,res) {
	//Contacts.update(name, callback)
	var conditions = {id:req.params.id};
	Contacts.update(conditions,req.body).then(doc => {
		if (!doc){
			return res.status(404).end();
		}
		return res.status(200).json(doc);
	})
	.catch(err => next (err));
})

const deleteContacts = app.delete('/contact/:id', function(req, res) {
	//Contacts.remove(param, callback)
	Contacts.findByIdandRemove(req.param.id).exec()
		.then(doc => {
			if(!doc) {
				return res.status(404).end();
			}
			return res.status(200).end();
		})
		.catch(err => next(err));
	})

	



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