const Project = require('../models/project');
const User = require('../models/user');
const ToDo = require('../models/toDo');

// Rendreing create project page
module.exports.renderNewProject = (req, res) => {
    return res.render('createProject/createProject', {
        layout: 'blank_layout',
        title: 'Create new project',
        onPage: 'createProject',
    });
}

// Creating new project
module.exports.createProject = async (req, res) => {
    try {
        let user_id = req.user._id;
        const user = await User.findById(user_id);
        if (user) {
            user.supervisor = user_id;
            let project = await Project.create({
                name: req.body.name,
                description: req.body.description,
                supervisor: req.user._id,
                team: [user_id],
                deadline: req.body.deadline
            });
            const toDoList = new ToDo({
                tasks: [],
            });
            const newToDoList = await toDoList.save();
            await User.findByIdAndUpdate(user_id, { projectsToDoList: newToDoList._id });
            await project.save();

            user.projects.push(project);
            await user.save();
            return res.redirect('/myTeam/');
        }
    } catch (err) {
        console.log("Error Creating new project: ",err);
        return res.redirect('back');
    }
}