const passport = require(`passport`);
const router = require('express').Router();
const feedbackController = require(`../controllers/feedbackController`);

router.get('/', passport.checkAuthentication , feedbackController.viewAllFeedbacks);  //route to view all feedbacks
// router.get('/create',passport.checkAuthentication , feedbackController.renderCreateFeedback);    //route to render create feedback page
// router.post('/create', passport.checkAuthentication ,feedbackController.createFeedback);    //route to create feedback
router.get('/:id', passport.checkAuthentication ,feedbackController.showFeedback);    //route to show particular feedback
router.patch('/:id', passport.checkAuthentication, feedbackController.editFeedback);    //route to edit particular feedback
router.post('/:id', passport.checkAuthentication, feedbackController.createFeedbackResponse);    //route to create response to particular feedback
// // Send feedback form to members of a particular project
// router.get(`/sendFeedback/:id`, passport.checkAuthentication , feedbackController.sendFeedback);

module.exports = router;