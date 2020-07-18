const User = require('../models/users');

//add user for testing - should not use this unless for testing!!!
const addUser = function(req, res) {
    const id = req.body.google_id
    const email = req.body.email
    const name = req.body.name
    const last_name = req.body.last_name
    const phone_number = req.body.phone_number

    const newUser = new User({
        google_id: id,
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


const routes = {
	getUsers: getUsers,
    addUser: addUser,
}

module.exports = routes;
