const express = require ('express');
const router = express.Router();

//importing route functions
const routes = require('./routes');
const contRoutes = require('./contacts');
const logsRoutes = require('./logs');
const auth = require('./auth');

//This will output all the users' names that are 
//in the database from the Users collection
router.get('/users', routes.getUsers);

//will add a user in the users' collection
//do not use this directly unless testing
router.post('/users', routes.addUser);

//will verify the user and will create a new user if not already exists
router.post('/auth', auth.verify);

//adding connections to the current user (user id passed in a link)
router.post('/addContact', contRoutes.addContact);

//gets the current user's contacts (have to pass in id)
router.get('/getContacts', contRoutes.getContacts)



module.exports = router;