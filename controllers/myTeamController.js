const Project = require(`../models/project`);
const User = require(`../models/user`);

// Showing myTeam Page 
module.exports.showCards = async (req , res)=>{
    const userId = req.user._id;
    const project = await Project.findOne({ team: userId.toString() }).populate({ path: 'team', populate: { path: 'projectsToDoList', populate: { path: 'tasks' } } });
    return res.render('myTeam/myTeam', {
        layout: 'blank_layout',
        title: 'Projects',
        onPage: 'myTeam',
        project: project
    });
}

// Adding member to myTeam
module.exports.addMember = async (req , res)=>{
    try {
        let empId = req.body.empId;
        let user = await User.findOne({ empId: empId });
        if(user){
            let project = await Project.findOne({ supervisor: req.user._id.toString() });
            let alreadyMember = await Project.findOne({ team: user._id.toString()  , supervisor: req.user._id.toString()});
            if(alreadyMember){
                return res.redirect('/myTeam');
            }
            project.team.push(user._id);
            await project.save();
        }
        return res.redirect('/myTeam');
    } catch (error) {
        console.log("Error in adding myTeam Member: ",error);
    }
}