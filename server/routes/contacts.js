const User = require('../models/users');


/*
Adds contact to the current user
*/
const addContact = (req, res) => {
    //get the fields of the new contact
    const user_id = req.body.user_id
	const name = req.body.name
	const last_name = req.body.last_name
	const category = req.body.category
	const general_notes = req.body.general_notes
	const contact_method = req.body.contact_method
	const email = req.body.email
    const phone_number = req.body.phone_number
    const frequency = req.body.frequency


	User.findOne({googleid: user_id})
		.then(user => {
            //add a new contact
            user.contacts.push({name: name, 
                                last_name: last_name, 
                                category: category, 
                                frequency: frequency,
                                general_notes: general_notes,
                                contact_method: contact_method,
                                email: email,
                                phone_number: phone_number,
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

/*
returns all the contacts of the current user
*/
const getContacts = function (req, res) {
    const user_id = req.query.id
    console.log("id issss:  " + user_id)
    User.findOne({googleid: user_id})
		.then(user => {
            res.send(user.contacts)
        })
        .catch(err => {
        console.log('error is: ' + err)
        res.status(400).json('Error: ' + err)
        })
    }

/*
edits a contact with the specified id 
request body - need to pass in current user id, and contact_id, and all the updated fields
*/
     const editContacts = function (req, res) {
        const user_id = req.body.user_id
        const contact_id = req.body.contact_id
        const name = req.body.name
        const last_name = req.body.last_name
        const category = req.body.category
        const general_notes = req.body.general_notes
        const contact_method = req.body.contact_method
        const email = req.body.email
        const phone_number = req.body.phone_number
        const frequency = req.body.frequency
        
        User.findOne({googleid: user_id})
		.then(user => {
            //get the array of contact JSON objects
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
                if(contact){
                    contact.name = name
                    contact.last_name = last_name
                    contact.category = category
                    contact.general_notes = general_notes
                    contact.contact_method = contact_method
                    contact.email = email
                    contact.phone_number = phone_number
                    contact.frequency= frequency
                    user.save()
                    .then(() => res.json('contact edited'))
                    .catch(err => res.status(400).json('Error: ' + err))
                }else {
                res.status(400).json('Error: the contact with the specified id does not exist')
                    }
        })
        .catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        });
    }

/*
deletes a contact with the specified id 
request body - need to pass in current user id, and contact_id
*/
    const deleteContacts = function(req, res){
    const user_id = req.body.user_id
    const contact_id = req.body.contact_id

    User.findOne({googleid: user_id})
		.then(user => {
            //get the array of contact JSON objects
            let contacts = user.contacts
            for(var i = 0; i < contacts.length; i++) {
                if(contacts[i]._id == contact_id) {
                    contacts.splice(i, 1);
                    break;
                }
            }
            user.save()
                .then(() => res.json('Contact deleted'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
		.catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        });
	}

    /*
    Given a current user_id, and contact_id, returns the contact info with specified id
    */
    const getIndContact = function(req, res){
        const user_id = req.body.user_id
        const contact_id = req.body.contact_id

        User.findOne({googleid: user_id})
		.then(user => {
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
            res.json(contact)
        })
        .catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        })
    }

    const ContactRoutes = {
        addContact: addContact,
        getContacts: getContacts,
        editContacts: editContacts,
        deleteContacts: deleteContacts,
        getIndContact: getIndContact
    }
    
module.exports = ContactRoutes;
    