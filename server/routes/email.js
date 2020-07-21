var nodemailer = require('nodemailer');
const User = require('../models/users');

const sendReminders = (req, res) => {
    //get all the users 
    User.find()
        .then(users => {
            //get each user
            users.forEach(user => {
                const friends = []
                const family = []
                const profess = []
                const contacts = user.contacts
                contacts.forEach(contact => {
                    console.log(contact)
                    const freq = contact.frequency
                    const logs = contact.logs
                    console.log(logs)
                    const dates = logs.map(log => (Date)(log.date))
                    dates.forEach(date => console.log(date))
                    const latest_date = Math.max(dates)
                    console.log(latest_date)


                })
            })
            //get the different categories for which they need to be reminded

            //remind them using sendEmail:)
        
        
        })
        .catch(err => res.status(400).json('Error: ' + err))
}


const sendEmail = (req, res) => {
        const to = req.body.to
        const text = req.body.text
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'palcheckhhh@gmail.com',
            pass: 'PalCheck!123'
            }
        });

        var mailOptions = {
            from: 'palcheckhhh@gmail.com',
            to: to,
            subject: 'PalCheck Reminder!',
            text: text
          };

        transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
            res.status(400).json('Error: ' + err)
        } else {
            console.log('Email sent: ' + info.response);
            res.json('success')
        }
        });
}

const emailRoutes = {
    sendEmail: sendEmail,
    sendReminders: sendReminders
}

module.exports = emailRoutes;
