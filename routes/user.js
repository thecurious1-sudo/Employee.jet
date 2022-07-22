const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.post('/login', passport.authenticate( `local` , {
        failureRedirect: `/`
    }) , userController.login);

router.get('/logout' , userController.logout);



module.exports=router;