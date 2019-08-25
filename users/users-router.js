const express = require('express');
const router = express.Router();
const db = require('./users-model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.get('/', (req, res) => {
    db.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "error" })
        })
})



//REGISTER

// username 
// password 
// name 
// email

router.post('/register', (req, res) => {
    //before send, bcrypt pass
     let credentials = req.body;
     let hash = bcrypt.hashSync(credentials.password, 14);
     credentials.password = hash;
     db.add(credentials)
        .then((id) => {
            res.status(200).json({ message: `User registered`, user_id: id[0]})
        })
        .catch(() => {
            res.status(500).json({ message: "error" })
        })
})

//LOGIN

// email
// password


router.post('/login', (req, res) => {
    let credentials = req.body;
    db.findBy("email", credentials.email)
        .then((user) => {
            if (!user || !bcrypt.compareSync(credentials.password, user.password)){
                res.status(400).json({ message: "invalid credentials"})
            } else {
                const token = getJwt(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    username: user.username,
                    token,
                });
            }
            console.log(user)
            res.status(200).json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "doh!" })
        })
    //check if user exists
        //if exists bcrypt pass verification
            //if passes send token
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    db.remove(id)
        .then((user) => {
            if(user){
                res.status(200).json({ "deleted user_id": user.id })
            } else {
                res.status(400).json({ error: "User doesn't exist" })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "Error"})
        })
})



function getJwt(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: '8h',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
  }

module.exports = router;