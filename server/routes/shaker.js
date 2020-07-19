const User = require('../models/users');

const shaker = (req, res) => {
    //get all the contacts id's
    const user_id = req.query.id
    User.findOne({googleid: user_id})
    .then(user => {
        const contacts  = user.contacts
        //randomize the index
        const min = 0;
        const max = contacts.length
        const rand = Math.floor(Math.random() * (max - min) + min)
        const contact = contacts[rand]
        //return the contact 
        res.json(contact)
    })
    .catch(err => {
    console.log('error is: ' + err)
    res.status(400).json('Error: ' + err)
    })
}


const shakerRoutes = {
    shaker: shaker
}

module.exports = shakerRoutes;