const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require("../models/task");
const ToDo = require(`../models/toDo`);
const moment = require('moment');

module.exports.login = async (req, res) => {
    const { empId, password } = req.body;
    const user = await User.findOne({ empId: empId });
    if (!user) {
        return res.status(400).send("User not found");
    }
    if (user.password !== password) {
        return res.status(400).send("Incorrect password");
    }
    return res.redirect('back');
}

module.exports.renderLogin = async (req, res) => {
    res.render('login');
}

module.exports.logout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(`Error in logging out`);
        }
        return res.redirect(`/`);
    });
}

// Creating functionality for private toDo list
module.exports.addTask_to_private_toDo = async (req, res) => {
    try {
        let user_id = req.user._id;
        const user = await User.findById(user_id);
        if (user) {
            let task = await Task.create({
                task: req.body.task,
                deadline: req.body.deadline
            });
            await task.save();
            if (user.pvtToDoList) {
                let toDo = await ToDo.findById(user.pvtToDoList._id);
                toDo.tasks.push(task);
                toDo.save();
                res.redirect('back');
            } else {
                let toDo = await ToDo.create({ tasks: [task] });
                user.pvtToDoList = toDo;
                user.save();
                res.redirect('back');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// Updating private todo list
module.exports.updatePrivateList = async (req, res) => {
    try {
        let taskId = req.params.id;
        let uId = req.user._id;
        let task = await Task.findByIdAndUpdate(taskId , {
            task: req.body.task,
            deadline: req.body.deadline
        });
        await task.save();
        return res.redirect('back');
    } catch (error) {
        console.log("Error in updating private todo list task", error);
        return res.redirect('back');
    }
}
