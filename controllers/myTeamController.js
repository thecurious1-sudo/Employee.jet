const Project = require(`../models/project`);
const User = require(`../models/user`);
const ToDo = require(`../models/toDo`);

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
            if(alreadyMember || user.projects.length > 0){
                return res.redirect('/myTeam');
            }
            project.team.push(user._id);
            await project.save();
            user.projects.push(project);
            await user.save();
            const toDoList = new ToDo({
              tasks: [],
            });
            const newToDoList = await toDoList.save();
            await User.findByIdAndUpdate(user._id, { projectsToDoList: newToDoList._id });
            await user.save();
        }

        if(req.xhr){
            return res.status(200).json({
                data: {
                    user: user
                },
                message: 'Member Added'
            })
        }
    } catch (error) {
        console.log("Error in adding myTeam Member: ",error);
        return res.redirect('/myTeam');
    }
}

// Removing a memmber from the team
module.exports.removeMember = async (req , res)=>{

}