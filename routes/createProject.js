const passport = require('passport');
const router = require('express').Router();
const createProjectController = require('../controllers/createProjectController');


// Rendering create project page
router.get(`/` , passport.checkAuthentication , createProjectController.renderNewProject);

// Creating new project
router.post(`/newProject` , passport.checkAuthentication , createProjectController.createProject);

module.exports = router;
