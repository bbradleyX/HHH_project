const User = require('../models/users');

//To Dos:
//1. error handling if request is not valid or smt like that


//adds contact to the given user's contact list (Should pass in the current user's google_id 
//and info about the contact that is being added)
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

    //returns all the contacts of a current user
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

     //returns updated contact info to the current user
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

    const deleteContacts = function(req, res){
    //getting information from the body of the request

    const user_id = req.body.user_id
    const contact_id = req.body.contact_id

    User.findOne({googleid: user_id})
		.then(user => {
            //get the array of contact JSON objects
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
            if(contact){
                for(var i = 0; i < contact.length; i++) {
                    if(contact[i]._id == contact_id) {
                        //res.status(200).json('loop'+ i);
                        contact.splice(i, 1);
                        break;
                    }
                }
                 user.save()
                        .then(() => res.json('Contact deleted'))
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



    const ContactRoutes = {
        addContact: addContact,
        getContacts: getContacts,
        editContacts: editContacts,
        deleteContacts: deleteContacts
    }
    
    module.exports = ContactRoutes;
    