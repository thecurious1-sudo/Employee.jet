const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.post('/login', passport.authenticate( `local` , {
        failureRedirect: `/`
    }) , userController.login);

router.get('/logout' , userController.logout);

router.post(`/add-task-to-privateList` , passport.checkAuthentication , userController.addTask_to_private_toDo);



module.exports=router;