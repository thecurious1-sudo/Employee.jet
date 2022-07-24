const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.post('/login', passport.authenticate( `local` , {
        failureRedirect: `/`
    }) , userController.login);

router.get('/logout' , userController.logout);

// Add task to private todo list
router.post(`/add-task-to-privateList` , passport.checkAuthentication , userController.addTask_to_private_toDo);

// Update task in private todo list
router.post('/update-private-todo-list/:id' , passport.checkAuthentication , userController.updatePrivateList);



module.exports=router;