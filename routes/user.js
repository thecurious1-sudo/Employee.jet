const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/login', (req, res) => {
    res.redirect('/',);
});
router.post('/login', passport.authenticate( `local` , {
        failureRedirect: `/`
    }) , userController.login);

router.get('/logout' , userController.logout);

// Add task to private todo list
router.post(`/add-task-to-privateList` , passport.checkAuthentication , userController.addTask_to_private_toDo);

// Update task in private todo list
router.post('/update-private-todo-list/:id' , passport.checkAuthentication , userController.updatePrivateList);

//Deleting Private todo list task
router.get(`/delete-private-todo-list-task/:id` , passport.checkAuthentication , userController.deleteTask);

//Showing User profile
router.get(`/profile`, passport.checkAuthentication, userController.profile);

router.post(`/update-task-status/:id` , passport.checkAuthentication , userController.updateTaskStatus);


module.exports=router;