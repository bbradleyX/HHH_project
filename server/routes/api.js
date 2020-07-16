const express = require ('express');
const router = express.Router();
const routes = require('./routes');
const auth = require('./auth');

//This will output all the users' names that are 
//in the database from the Users collection
router.get('/users', routes.getUsers);

//will add a user in the users' collection
router.post('/users', routes.addUser);

//will verify the user or create a new user
router.post('/auth', auth.verify)



module.exports = router;