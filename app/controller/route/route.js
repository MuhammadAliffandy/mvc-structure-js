const express = require('express');
const router = express.Router();

const users = require('../api/users')
const cars = require('../api/cars')

router.use('/users', users);
router.use('/cars', cars );

module.exports = router;