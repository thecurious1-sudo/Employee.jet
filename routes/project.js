const router = require('express').Router();
const passport = require('passport');
const projectController = require('../controllers/projectController');

// Add task to private todo list
router.get(`/create` , passport.checkAuthentication , projectController.renderNewProject);

router.get(`/` , passport.checkAuthentication , projectController.showProjects);

module.exports=router;