require('dotenv').config();
const {OAuth2Client} = require('google-auth-library')
const CLIENT_ID = process.env.Google_Client_Id
const client = new OAuth2Client(CLIENT_ID)
const User = require('../models/users');
const e = require('express');

/*
this code uses Google Auth libraries to verify the token 
if the token is valid, then it checks wether or not the user already exists in the database.
If it does, nothing happens (probably will have to add sessions?) - if does not exist, then
creates one.
@params - token from google
*/
const verify = async function (req, res) {
    let token = req.body.id_token

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })
        .then((ticket) => {
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            const name = payload.given_name;
            const last_name = payload.family_name;
            const email = payload.email;

            User.exists({googleid: userid}, function (err, doc) { 
                if (err){ 
                    res.status(400).json('Error: ' + err)
                } else { 
                    //if a user exists
                    if (doc){
                        res.json('user signed in')
                    } else {
                        //add a new user
                        const newUser = new User ({
                            googleid: userid,
                            name: name,
                            last_name: last_name,
                            email: email  
                        })
                        newUser.save()
                        .then(() => res.json('new user registered'))
                        .catch(err => res.status(400).json('Error: ' + err))
                    }
                } 
            })
        })
        .catch (err => {
            console.log(err)
            res.status(400).json('Error: ' + err)});
  }


const auth = {
    verify: verify
}


module.exports = auth;