const passport = require('passport');
const router = require(`express`).Router();
const myTeamController = require('../controllers/myTeamController');


// Rendering myTeam Page
router.get(`/` , passport.checkAuthentication , myTeamController.showCards);

// Add member to myTeam
router.post(`/addMember` , passport.checkAuthentication , myTeamController.addMember);

// Remove member from my team
router.get(`/remove` , passport.checkAuthentication , myTeamController.remove);

module.exports = router;