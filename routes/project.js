const router = require('express').Router();
const passport = require('passport');
const projectController = require('../controllers/projectController');

// Add task to private todo list
router.get(`/create`, passport.checkAuthentication, projectController.renderNewProject);

router.get(`/`, passport.checkAuthentication, projectController.showProjects);

// Add task to view project todo list
router.post(`/add-task-to-view-project-todo-list/:id`, passport.checkAuthentication, projectController.addTask);

// Delete task from view project todo list
router.get('/delete-view-project-list-task' , passport.checkAuthentication, projectController.deleteTask);

// Update task from view project todo list
router.post(`/update-view-project-todo-list/:id` , passport.checkAuthentication , projectController.updateList);

module.exports = router;