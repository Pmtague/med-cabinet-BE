const express = require('express');
const router = express.Router();
const db = require('./reviews-model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const axios = require('axios')

router.get('/', (req, res) => {
    db.find()
        .then((reviews) => {
            res.status(200).json(reviews)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "doh!" })
        })
})

router.post('/:id', (req, res) => {
    let review = req.body.review;
    let strain_id = req.body.strain_id;
    let post = {
        ...review, 
        strain_id
    }
    db.add(post)
        .then(() => {

        })
        .catch(() => {

        })
})

module.exports = router;