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
    db.login("email", credentials.email)
        .then((resp) => {
            // console.log(resp.user)
            if (!resp.user || !bcrypt.compareSync(credentials.password, resp.user.password)){
                res.status(400).json({ message: "invalid credentials"})
            } else {
                const token = getJwt(resp.user);
                res.status(200).json({
                    user: resp.user,
                    token,
                    reviews: resp.reviews,
                    reviewedStrains: resp.reviewedStrains,
                    recommendations: resp.recommendations
                });
            }
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

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let updates = req.body;
    db.update(id, updates)
        .then((countUpdated) => {
            res.status(200).json(countUpdated)
        })  
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "doh!" })
        })
})


// T E S T---------------------------
    // tests auth and making HTTP requests from within Express
router.get('/test', (req, res) => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
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