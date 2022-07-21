const router = require('express').Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

router.get('/login',userController.renderLogin);
router.post('/login', userController.login);


module.exports=router;