const express = require('express');
const router = express.Router();
const db = require('./reviews-model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const moment = require('moment');

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
    let id = req.params.id;
    let review = req.body;
    // console.log(review)
    let post = {
        ...review,
        user_id: id,
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    // console.log(post)
    db.add(post)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "Doh!" })
        })
})

module.exports = router;