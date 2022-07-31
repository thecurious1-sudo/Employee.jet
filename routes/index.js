const mongoose = require('mongoose');
const router = require('express').Router();

const homeController = require('../controllers/homeController');

router.get('/' , homeController.home);
router.use('/users', require('./user'));
router.use('/feedback', require('./feedback'));
router.use('/projects', require('./project'));
router.use(`/myTeam` , require(`./myTeam`));
router.use(`/createProject` , require(`./createProject`));

module.exports = router;