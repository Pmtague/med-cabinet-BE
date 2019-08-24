const express = require('express');
const usersRouter = require('../users/users-router')

const router = express.Router();

router.use('/users', usersRouter)

module.exports = router;