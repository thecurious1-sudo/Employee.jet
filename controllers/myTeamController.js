const Project = require(`../models/project`);

// Showing myTeam Page 
module.exports.showCards = async (req , res)=>{
    const userId = req.user._id;
    const project = await Project.findOne({ supervisor: userId.toString() }).populate({ path: 'team', populate: { path: 'projectsToDoList', populate: { path: 'tasks' } } });
    return res.render('myTeam/myTeam', {
        layout: 'blank_layout',
        title: 'Projects',
        onPage: 'myTeam',
        project: project
    });
}