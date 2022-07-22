const mongoose = require('mongoose');
const router = require('express').Router();

const homeController = require('../controllers/homeController');

router.get('/' , homeController.home);
router.use('/users', require('./user'));

module.exports = router;