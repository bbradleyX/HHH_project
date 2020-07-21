const express = require ('express');
const router = express.Router();

//importing route functions
const routes = require('./userRoutes');
const contRoutes = require('./contacts');
const logsRoutes = require('./logs');
const auth = require('./auth');
const shakerRoutes = require('./shaker')

//This will output all the users' names that are 
//in the database from the Users collection
router.get('/users', routes.getUsers);

//will add a user in the users' collection
//do not use this directly unless testing
router.post('/users', routes.addUser);

//edits user with updated fields (pass in all the fields except for contacts and email)
router.put('/users', routes.editUser);

//delets a user in the url specified parameter id
router.delete('/users', routes.deleteUser);

//will verify the user and will create a new user if not already exists
router.post('/auth', auth.verify);

//adding connections to the current user (user id passed in a link)
router.post('/addContact', contRoutes.addContact);

//gets the current user's contacts (have to pass in id)
router.get('/getContacts', contRoutes.getContacts)

//adds logs, need to pass in the current user id, contact id for which adding logs, 
//and time (optionally notes as well) in the body 
router.post('/addLogs', logsRoutes.addLogs)


//gets all the logs for a current user with a specific contact - need to pass in 
//the current user google_id as user_id and the contact_id
router.get('/getLogs', logsRoutes.getLogs)

//edits the given log with a specific id for a current user with a specified contact
//need to pass in google_id of the current user, need to pass in the contact id and the log_id 
//that needs to be modified as well as the new log details - all in the body of the request
router.put('/editLogs', logsRoutes.editLogs)

//deletes a log with the specified id (need to pass in current user, and the connection)
router.delete('/deleteLogs', logsRoutes.deleteLogs)

//gets a random contact of the current user passed as the parameter
router.get('/shake', shakerRoutes.shaker)

router.put('/editContacts', contRoutes.editContacts)
router.delete('/deleteContacts', contRoutes.deleteContacts)



module.exports = router;