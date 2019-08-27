const express = require('express');
const router = express.Router();
const db = require('./users-model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const axios = require('axios')

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



// R E G I S T E R ------------------------------------------
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

// L O G I N-------------------------------------------------
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
})


// D E L E T E---------------------------------
    // id required in URL
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


// T E S T---------------------------
    // tests auth and making HTTP requests from within Express
router.get('/test', (req, res) => {
    axios.get(`postgres://cneqxveo:DT0HK7Z4JdDVuGruuR8figCUjFMS7-0h@isilo.db.elephantsql.com:5432/cneqxveo`)
        .then(resp => {
            // console.log(resp.data)
            res.status(200).json(resp.data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "doh" })
        })
})




// M I D D L E W A R E ####################################################

function restricted(req, res, next) {
    const token = req.headers.token;
    if (token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(!err){
                req.decodedJwt = decodedToken;
                next();
            } else {
                res.status(500).json({ message: "invalid token" })
            }
        })
    }else{
        res.status(400).json({message: "Bad request"})
    }

}

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