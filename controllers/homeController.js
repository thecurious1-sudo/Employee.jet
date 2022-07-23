const User = require('../models/user');
const ToDo = require('../models/toDo');
const Task = require('../models/task');

module.exports.home = async (req , res)=>{
    if(!req.user){
        return res.render('landingPage' , {
            layout: 'blank_layout',
            title: 'Employee.Jet'
        });
    }

    //populate the user object with the toDoList and tasks
    const user = await User.findById(req.user._id).populate({path: 'pvtToDoList' , populate: {path: 'tasks',model: 'Task'}});
    return res.render('home', {
        layout: 'blank_layout',
        title: 'Employee.Jet | Home',
        tasks: (user.pvtToDoList == null)?null:user.pvtToDoList.tasks
    });
}