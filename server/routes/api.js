const express = require ('express');
const router = express.Router();

//importing route functions
const routes = require('./userRoutes');
const contRoutes = require('./contacts');
const logsRoutes = require('./logs');
const auth = require('./auth');
const shakerRoutes = require('./shaker');
const emailRoutes = require('./email');

/*
This will output all the users that are 
in the database from the Users collection 
*/
router.get('/users', routes.getUsers);

/*
will add a user in the users' collection
do not use this directly unless testing
*/
router.post('/users', routes.addUser);

/*
Edits user with updated fields 
(pass in all the fields except for contacts and email)
*/
router.put('/users', routes.editUser);

/*
deletes a user in the url specified parameter id
*/
router.delete('/users', routes.deleteUser);

/*
will verify the user and will create a new user if not already exists: Google Sign-in API
*/
router.post('/auth', auth.verify);

/*
adding connections to the current user 
request params - user_id (googleid)
body - name, last_name, category, general_notes,   
       contact_method, email, phone_number, frequency
*/
router.post('/addContact', contRoutes.addContact);

/*
gets the current user's contacts
request params - user_id (googleid)
*/
router.get('/getContacts', contRoutes.getContacts)

/*
Returns the individual contact info with specified id
request body - current user_id and contact_id, 
*/
router.get('/getIndividual', contRoutes.getIndContact)

/*
edits a contact with the specified id 
request body - need to pass in current user id, and contact_id, and all the updated fields
*/
router.put('/editContacts', contRoutes.editContacts)

/*
deletes a contact with the specified id 
request body - need to pass in current user id, and contact_id
*/
router.delete('/deleteContacts', contRoutes.deleteContacts)

/*
adds logs for a current user with the specified contact
body - user_id(googleid), contact_id, date, notes
 */
router.post('/addLogs', logsRoutes.addLogs)

/*
gets all the logs for a current user with a specific contact
body - user_id(googleid), contact_id
 */
router.get('/getLogs', logsRoutes.getLogs)

/*
edits the given log with a specific id for a current user with a specified contact
body - user_id(googleid), contact_id, log_id, date, notes
*/
router.put('/editLogs', logsRoutes.editLogs)

/* 
deletes a log with the specified id
body - user_id(google_id), contact_id, log_id
*/
router.delete('/deleteLogs', logsRoutes.deleteLogs)

/*
gets a random contact for the current user
request param - user_id(googleid)
*/
router.get('/shake', shakerRoutes.shaker)

/*
sends reminders to the users
*/
router.get('/remind', emailRoutes.sendReminders)

module.exports = router;