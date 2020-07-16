const express = require ('express')
const Users = require('../models/users');

//this function gets a list of all the users
//will pass back either data or the error message to the callback function
const getUsers = (callback) => {
  Users.find({}, callback)
};

const addUser = (param, callback) => {
	Users.create(param, callback)
};



const queries = {
	getUsers: getUsers,
	addUser: addUser,
}

module.exports = queries;