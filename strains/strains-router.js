const express = require('express');
const router = express.Router();
const db = require('./strains-model.js')
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.get('/', (req, res) => {
    db.find()
        .then((resp) => {
            res.status(200).json(resp)
        })
        .catch(() => {
            res.status(500).json({ message: "doh!" })
        })
})

module.exports = router; 