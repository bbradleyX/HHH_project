const express = require ('express');
const router = express.Router();
const routes = require('./routes');
const auth = require('./auth');

//This will output all the users' names that are 
//in the database from the Users collection
router.get('/users', routes.getUsers);

//will add a user in the users' collection
router.post('/users', routes.addUser);

//will verify the user and will create a new user if not already exists
router.post('/auth', auth.verify);

//adding connections(this is for testing - replace with Bria's later)
router.post('/addContact', routes.addContact)



module.exports = router;