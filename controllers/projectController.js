const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require("../models/task");
const ToDo = require(`../models/toDo`);
const Project=require('../models/project');



module.exports.renderNewProject = (req, res) => {
    return res.render('project/create', {
        layout: 'blank_layout',
        title: 'Create new project',
        onPage: 'createProject',
    });
}

module.exports.showProjects = async(req, res) => {
    const userId = req.user._id;
    const project = await Project.findOne({ supervisor: userId.toString() }).populate({ path:'team', populate: { path: 'projectsToDoList', populate: { path: 'tasks' } } });
    console.log(project);
    return res.render('project/index', {
        layout: 'blank_layout',
        title: 'Projects',
        onPage: 'viewProjects',
        project: project
    });
}