require('dotenv').config();
const {OAuth2Client} = require('google-auth-library')
const CLIENT_ID = process.env.Google_Client_Id
const client = new OAuth2Client(CLIENT_ID)
const User = require('../models/users');
const e = require('express');

const verify = async function (req, res) {
    let token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlNGViZTQ4N2Q1Y2RmMmIwMjZhM2IyMjlkODZmMGQ0MjU4NDQ5ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzM3MzAyMTIzNDU4LXFoYWdia200MmkxazFtaHJjdjhxZDlraG9ybjVwN21iLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzM3MzAyMTIzNDU4LXFoYWdia200MmkxazFtaHJjdjhxZDlraG9ybjVwN21iLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwMTMxNzE5MTc0MTQ2MjU3ODY5IiwiZW1haWwiOiJtZXJpa2F2dGVsaXNodmlsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkxLOUdzeXg0aVV1QVpfRlF4dWliZWciLCJuYW1lIjoiTWVyaSBLYXZ0ZWxpc2h2aWxpIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tOVd1V1BFbHFaOGMvQUFBQUFBQUFBQUkvQUFBQUFBQUFBT28vQU1adXVjbU9qQjJheldrOHNNNjBFT3JnS19yam12Q3VLUS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiTWVyaSIsImZhbWlseV9uYW1lIjoiS2F2dGVsaXNodmlsaSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTk0ODY0ODA5LCJleHAiOjE1OTQ4Njg0MDksImp0aSI6IjEzYWI1NzhmNTY1ODQxYjM2NjFlZjM5MjRjMjJhODEwZmZkMGEwMDEifQ.lY5-IhdVfztpbMua_D0c9G7KGFQb3jJfJsvNi2fo6GuosoeCONxaClVWfugR2wL76l0DEAQ89AvfnmHEy0dK8q7Fy9Ikm1VB64VBWS_3lCxcEMK0r76H-mNIea6qUlUPddpc14-Sskm0o0APzCgTHOQLdbbR5bie_LfiAyT4PXU9WzWh0FrDrA8y7wt0JKVHSUGdqgayK07BksHhi97cfrUOFQ5EgcOMUPL8pCdTbKpBL7D3hzGLZVCqfAqSTxCacPao0ujdnPcx6FAYO74tYf9Zd-c0Rea7NvP-34E0IvwrLBXPQC8hD77Khv9KYECZC15Usb0BinI18ky9z-kjAQ'
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        const name = payload.given_name;
        const last_name = payload.family_name;
        const email = payload.email;

        User.exists({googleid: userid}, function (err, doc) { 
            if (err){ 
                res.status(400).json('Error: ' + err)
            }else{ 
                //create a new one
                if (doc){
                    res.json('user signed in')
                } else {
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
        console.log(payload)
        console.log('userid is' + userid)

    } catch (error){
        console.log(error)
        res.status(400).json('Error: ' + err);
    }

    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }


const auth = {
    verify: verify
}


module.exports = auth;