const express = require ('express');
const router = express.Router();
const query = require('../models/query');
const { use } = require('./api');
const User = require('../models/users');

//maybe not importing something right?

//gets all the user in the users collection
const getUsers = function(req, res) {
    query.getUsers(
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: 'Malformed request'
                });
            } else {
                console.log('Found users data:');
                res.json(data);
            }
    });
}

//adds a new user to the users collection
//do not use this function unless for testing
const addUser = function(req, res) {
    if (req.body){
        query.addUser(req.body, 
            (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        message: 'Malformed request'
                    });
                } else {
                    console.log('Added a user:');
                    res.json(data)
                }
            })
    } else {
        res.json({
        error: "The input field is empty"
        })
    }
}

const addContact = (req, res) => {
    //get the fields of the new contact
    const user_id = req.body.id
    console.log('user id issss ' +  user_id)
	const name = req.body.name
	const last_name = req.body.last_name
	const category = req.body.category
	const general_notes = req.body.general_notes
	const contact_method = req.body.contact_method
	const email = req.body.email
	const phone_number = (Number)(req.body.phone_number)

	// const newContact = new Contact(
	// 	{
	// 		name, 
	// 		last_name,
	// 		category,
	// 		general_notes,
	// 		contact_method,
	// 		email,
	// 		phone_number
	// 	}
	// )

	User.findOne({googleid: user_id})
		.then(user => {
			console.log('hellooooo thereeeeeeeeeeeeeeee notice meeeeee ' + user)
            //add the new contact and save
            
            const name = user.name
            console.log('name isssssssssssssssssssssssssss' + name)
			user.contacts.push({name: name, last_name: last_name, category: category})
            user.save()
                .then(() => res.json('contact added'))
                .catch(err => res.status(400).json('Error: ' + err))
		})
		.catch(err => {
			console.log('something happened somewhere lol')
            console.log(err)
            res.status(400).json('Error: ' + err)
        });
    }

    const findUserWithId = function(req, res) {

    }




const routes = {
	getUsers: getUsers,
    addUser: addUser,
    addContact: addContact
}

module.exports = routes;
