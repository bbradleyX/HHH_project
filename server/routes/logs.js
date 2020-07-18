const User = require('../models/users');

//adding logs
const addLogs = (req, res) => {
    //getting information from the body of the request
    const user_id = req.body.user_id
    const contact_id = req.body.contact_id
    const date = Date.parse(req.body.date)
    const notes = req.body.notes

    User.findOne({googleid: user_id})
		.then(user => {
            //get the array of contact JSON objects
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
            if (contact) {
                //then add a new log
                contact.Logs.push({
                    date: date, 
                    notes: notes
                })
                user.save()
                    .then(() => res.json('log added'))
                    .catch(err => res.status(400).json('Error: ' + err))
            } else {
                res.status(400).json('Error: the contact with the specified id does not exist')
            }
        })
		.catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        });
    }


//getting logs
//To do: find out if I should get rid of getting back id
const getLogs = (req, res) => {
    const user_id = req.body.user_id
    const contact_id = req.body.contact_id

    User.findOne({googleid: user_id})
		.then(user => {
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
            console.log('success')
            console.log(contact.Logs)
            res.send(contact.Logs)
        })
        .catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        })
}

//editing logs
const editLogs = (req, res) => {
    //getting information from the body of the request
    const user_id = req.body.user_id
    const contact_id = req.body.contact_id
    const log_id = req.body.log_id
    const date = Date.parse(req.body.date)
    const notes = req.body.notes

    User.findOne({googleid: user_id})
		.then(user => {
            //get the array of contact JSON objects
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
            if (contact) {
                //then add a new log
                let logs = contact.Logs
                const log = logs.find(element => element._id == log_id)
                if (log){
                     //change the object
                    log.date = date
                    log.notes = notes
                    user.save()
                        .then(() => res.json('log edited'))
                        .catch(err => res.status(400).json('Error: ' + err))
                } else {
                    res.status(400).json('Error: the log with the specified id does not exist')
                }
            } else {
                res.status(400).json('Error: the contact with the specified id does not exist')
            }
        })
		.catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        });
    }


//deleting logs
const deleteLogs = (req, res) => {
    //getting information from the body of the request
    const user_id = req.body.user_id
    const contact_id = req.body.contact_id
    const log_id = req.body.log_id

    User.findOne({googleid: user_id})
		.then(user => {
            //get the array of contact JSON objects
            let contacts = user.contacts
            const contact = contacts.find(element => element._id == contact_id)
            if (contact) {
                //then add a new log
                let logs = contact.Logs
                for(var i = 0; i < logs.length; i++) {
                    if(logs[i]._id == log_id) {
                        logs.splice(i, 1);
                        break;
                    }
                }
                 user.save()
                        .then(() => res.json('log deleted'))
                        .catch(err => res.status(400).json('Error: ' + err))
            } else {
                res.status(400).json('Error: the contact with the specified id does not exist')
            }
        })
		.catch(err => {
            console.log('error is: ' + err)
            res.status(400).json('Error: ' + err)
        });
    }




const logsRoutes = {
    addLogs: addLogs,
    getLogs: getLogs,
    editLogs: editLogs,
    deleteLogs: deleteLogs
}

module.exports = logsRoutes;
