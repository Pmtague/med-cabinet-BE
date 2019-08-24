const express = require('express');
const router = express.Router();
const db = require('./users-model.js')
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

module.exports = router;