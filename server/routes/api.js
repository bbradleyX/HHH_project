const express = require ('express');
const router = express.Router();
const routes = require('./routes');

//This will output all the users' names that are 
//in the database from the Users collection
router.get('/users', routes.getUsers);

//will add a user in the users' collection
router.post('/users', routes.addUser);


module.exports = router;