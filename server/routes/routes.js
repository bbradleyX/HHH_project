const express = require ('express');
const router = express.Router();
const query = require('../models/query');


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



const routes = {
	getUsers: getUsers,
    addUser: addUser
}

module.exports = routes;
