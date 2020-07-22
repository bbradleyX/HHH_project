var nodemailer = require('nodemailer');
const User = require('../models/users');

/*
sends reminders to the users with the following logic: for each user it checks each contact. 
For each contact, it checks when the last log was submitted and if the more time has lapsed
than the user set the frequency of reminders to, will send a reminder - it sends only one email 
to each user will all the reminders together
*/
const sendReminders = (req, res) => {
    User.find()
        .then(users => {
            //get each user
            users.forEach(user => {
                const friends = []
                const family = []
                const profess = []
                const contacts = user.contacts
                //each contact
                contacts.forEach(contact => {
                    const freq = contact.frequency
                    const logs = contact.logs
                    const dates = logs.map(log => log.date.getTime())
                    const latest_date = Math.max(...dates) 
                    //if overtime, push to the coressponding categorys
                    if (checkIfOvertime(freq, latest_date)) {
                        const toCall = {
                            name: contact.name,
                            last_name: contact.last_name
                        }
                        if (contact.category == 'Friend'){
                            friends.push(toCall)
                        } else if (contact.category == 'Family'){
                            family.push(toCall)
                        } else {
                            profess.push(toCall)
                        }
                    }
                })
                var needsReminder = false;
                if (friends.length > 0 || family.length > 0 || profess.length > 0) {
                    needsReminder = true
                }
                if (needsReminder) {
                    const text = makeText(friends, family, profess)
                    console.log(text)
                    sendEmail(user.email, text)
                } 
            })
            res.json('Emails sucessfully sent')
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

/*
@param: friends - array of friends for which the user needs a reminder
@param: family - array of family members for which the user needs a reminder
@param: profess - array of professional relationships for which the user needs a reminder
@result: text which icludes the reminder that will be sent to the user populated with the 
         names of people who the user needs to reach out to placed in their categories
*/
const makeText = (friends, family, profess) => {

    let text = "Hi, thank you for using PalCheck!\n\nBased on your customizable reminders, " + 
    "we wanted to remind you to reach out to your "
    
    if (friends.length > 0){
        text = text + 'friends: '
        friends.forEach(friend => {
            text = text + " " + friend.name + " " + friend.last_name + ","
        })
        text = text.substring(0, text.length - 1);
        text = text + '\n'
    }
    if (family.length > 0){
        text = text + 'family: '
        family.forEach(member => {
            text = text + member.name + " " + member.last_name + ","
        })
        text = text.substring(0, text.length - 1);
        text = text + '\n'

    }
    if (profess.length > 0){
        text = text + 'professional network: '
        profess.forEach(prof => {
            text = text + prof.name + " " + prof.last_name + ","
        })
        text = text.substring(0, text.length - 1);
    }
    text = text + "\n\nBest,\nPalCheck Team"

    return text
}
/*
@param: freq - frequency by which the user wants to contact their connection
@param: latest_date - last time the log was submitted 
@result: will determine wether or not user needs to be reminded
@return type: boolean
*/
const checkIfOvertime = (freq, latest_date) => {
    const today = Date.now()
    //get the number of days passed
    var diff = (today - latest_date)/(1000*60*60*24)

    if (freq == "1"){
       if (diff >= 1) {
           return true
       }           
    } else if (freq == "2"){
        if (diff >= 3) {
            return true
        }
    } else if (freq == "3"){
        if (diff >= 7) {
            return true
        } 
    } else if (freq == "4"){
        if (diff >= 14) {
            return true
        } 
    } else if (freq == "5"){
        if (diff >= 21) {
            return true
        } 
    } else if (freq === "6"){
        if (diff >= 30) {
            return true
        } 
    } else {
        if (diff >= 60) {
            return true
        } 
    } 
    return false;
}

/*
Will send an email
@param: to - email address of the receiver
@text: body of the email
*/
const sendEmail = (to, text) => {
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
