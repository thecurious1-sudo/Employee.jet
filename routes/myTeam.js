const passport = require('passport');
const router = require(`express`).Router();
const myTeamController = require('../controllers/myTeamController');


// Rendering myTeam Page
router.get(`/` , passport.checkAuthentication , myTeamController.showCards);

module.exports = router;