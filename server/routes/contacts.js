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


    const ContactRoutes = {
        addContact: addContact,
        getContacts: getContacts
    }
    
    module.exports = ContactRoutes;
    