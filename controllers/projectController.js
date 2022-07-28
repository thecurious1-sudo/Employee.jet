const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require("../models/task");
const ToDo = require(`../models/toDo`);
const Project = require('../models/project');



module.exports.renderNewProject = (req, res) => {
    return res.render('project/create', {
        layout: 'blank_layout',
        title: 'Create new project',
        onPage: 'createProject',
    });
}

module.exports.showProjects = async (req, res) => {
    const userId = req.user._id;
    const project = await Project.findOne({ team: userId.toString() }).populate({ path: 'team', populate: { path: 'projectsToDoList', populate: { path: 'tasks' } } });
    return res.render('project/index', {
        layout: 'blank_layout',
        title: 'Projects',
        onPage: 'viewProjects',
        project: project
    });
}

// Adding task to view project todo list
module.exports.addTask = async (req, res) => {
    try {
        let user_id = req.params.id;
        const user = await User.findById(user_id);
        if (user) {
            let task = await Task.create({
                task: req.body.task,
                deadline: req.body.deadline
            });

            await task.save();

            if (user.projectsToDoList) {
                let toDo = await ToDo.findById(user.projectsToDoList._id);
                toDo.tasks.push(task);
                await toDo.save();
            } else {
                let toDo = await ToDo.create({ tasks: [task] });
                user.projectsToDoList = toDo;
                user.save();
            }
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        task: task,
                        uid: user_id
                    },
                    message: 'Task Created'
                });
            }
        }
        // return res.redirect('back');
    } catch (error) {
        console.log("Error in adding task to view project todo list: ",error);
        // return res.redirect('/');
    }
}

module.exports.deleteTask = async (req , res)=>{
    try {
        let uid = req.query.uid;
        let user = await User.findById(uid);
        let projectToDoList_ID = user.projectsToDoList;

        let task_id = req.query.tid;
        await Task.findByIdAndDelete(task_id);

        let todo = await ToDo.findByIdAndUpdate(projectToDoList_ID , {$pull: {tasks: task_id}});
        await todo.save();

        if(req.xhr){
            return res.status(200).json({
                data: {
                    task_id : task_id,
                },
                message: 'Task Deleted'
            })
        }
        return res.redirect(`back`);
    } catch (error) {
        console.log("Error in deleting a task: ", error);
        return res.redirect('back');
    }
}

// Updating vire project todo list
module.exports.updateList = async (req, res) => {
    try {
        let taskId = req.params.id;
        let task = await Task.findByIdAndUpdate(taskId, {
            task: req.body.task
        });
        await task.save();
        if(req.xhr){
            return res.status(200).json({
                message: "UPDATED"
            });
        }
    } catch (error) {
        console.log("Error in updating private todo list task: ", error);
        return res.redirect('back');
    }
}