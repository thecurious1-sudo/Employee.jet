const User = require('../models/User');
const ToDo = require('../models/ToDo');
const Task = require('../models/Task');

module.exports.home = async (req , res)=>{
    if(!req.user){
        return res.render('landingPage' , {
            layout: 'blank_layout',
            title: 'Employee.Jet'
        });
    }

    //populate the user object with the toDoList and tasks
    const user = await User.findById(req.user._id).populate({path: 'pvtToDoList' , populate: {path: 'tasks',model: 'Task'}});
    //console.log(user.pvtToDoList.tasks);
    return res.render('home', {
        layout: 'blank_layout',
        title: 'Employee.Jet | Home',
        tasks: user.pvtToDoList.tasks
    });
}