const express = require('express');

const usersRouter = require('../users/users-router')
const strainsRouter = require('../strains/strains-router')
const reviewsRouter = require('../reviews/reviews-router')

const router = express.Router();

router.use('/users', usersRouter)
router.use('/strains', strainsRouter)
router.use('/reviews', reviewsRouter)



module.exports = router;