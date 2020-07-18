const User = require('../models/users');

//add user for testing - should not use this unless for testing!!!
const addUser = function(req, res) {
    const id = req.body.google_id
    const email = req.body.email
    const name = req.body.name
    const last_name = req.body.last_name
    const phone_number = req.body.phone_number

    const newUser = new User({
        googleid: id,
        email: email,
        name: name,
        last_name: last_name,
        phone_number: phone_number
    });

    newUser.save()
        .then(() => res.json('User Added with a test function!'))
        .catch(err => res.status(400).json('Error: ' + err))
}


//gets a all the users from the database
const getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
}

//edits a user, cannot edit the id or email for now (o.w should prob add a confirmation step later) 
const editUser = (req, res) => {
    const name = req.body.name
    const last_name = req.body.last_name
    const phone_number = req.body.phone_number
    const google_id = req.body.user_id

    User.findOne({googleid: google_id})
        .then(user => {
            user.name = name
            user.last_name = last_name
            user.phone_number = phone_number      
            
            user.save()
            .then(() => res.json('Sucessfully updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }) 
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
}

//deletes a user, pass in id in parameters
const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.query.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}

const routes = {
	getUsers: getUsers,
    addUser: addUser,
    editUser: editUser,
    deleteUser: deleteUser
}

module.exports = routes;
