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

//adds contact to the given user's contact list (Should pass in the current user's google_id 
//and info about the contact that is being added)
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
	const phone_number = req.body.phone_number


	User.findOne({googleid: user_id})
		.then(user => {
            //add a new contact
    user.contacts.push({name: name, 
                        last_name: last_name, 
                        category: category, 
                        general_notes: general_notes,
                        contact_method: contact_method,
                        email: email,
                        phone_number: phone_number
                    })
            user.save()
                .then(() => res.json('contact added'))
                .catch(err => res.status(400).json('Error: ' + err))
		})
		.catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        });
    }

    //returns all the contacts of a current user
    const getContacts = function (req, res) {
        const user_id = req.query.id
        console.log("id issss:  " + user_id)
        User.findOne({googleid: user_id})
		.then(user => {
            console.log(user.contacts)
            res.send(user.contacts)
        })
        .catch(err => {
        console.log('error is: ' + err)
        res.status(400).json('Error: ' + err)
        })
    }

const routes = {
	getUsers: getUsers,
    addUser: addUser,
    addContact: addContact,
    getContacts: getContacts
}

module.exports = routes;
