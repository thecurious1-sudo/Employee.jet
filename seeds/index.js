const mongoose = require("mongoose");
const User = require("../models/user");
const ToDo = require("../models/toDo");
const db = require("../config/mongoose");
const Task = require("../models/task");
const Project = require("../models/project");

const users = require("./data").users;
const toDoListPvt = require("./data").todoDataPvt;
const projects = require("./data").returnProjects;

const saveUsers = async (users) => {
  await User.deleteMany({});
  const Users = await User.insertMany(users);
}

const saveToDoList = async (toDoListPvt) => {
  await ToDo.deleteMany({});
  await Task.deleteMany({});
  const user = await User.findOne({ empId: "5" });
  const toDoList = new ToDo({
    tasks: [],
  });
  for (let i = 0; i < toDoListPvt.length; i++) {
    const temp = new Task(toDoListPvt[i]);
    const newTask = await temp.save();
    toDoList.tasks.push(newTask._id);
  }
  const newToDoList = await toDoList.save();
  const temp2 = await User.findByIdAndUpdate(
    user._id.toString(),
    { pvtToDoList: newToDoList._id },
    { new: true }
  );
  console.log("ToDoList saved");
};

const saveProjects = async (projects) => {
  const projectsArray = await projects();
  await Project.deleteMany({});
  await Project.insertMany(projectsArray);
  // for (let i = 0; i < projectsArray.length; i++) {
  //   for (let j = 0; j < projectsArray[i].team.length; j++) {
  //     const newTodo = new ToDo();
  //     await newTodo.save();
  //     await User.findByIdAndUpdate( projectsArray[i].team[j], { projectsToDoList: newTodo._id }, { new: true } );
  //   }
  // }
  for (let i = 0; i < projectsArray.length; i++) {
    for (let j = 0; j < projectsArray[i].team.length; j++) {
      const user = await User.findById(projectsArray[i].team[j]);
      const toDoList = new ToDo({
        tasks: [],
      });
      for (let i = 0; i < toDoListPvt.length; i++) {
        const temp = new Task(toDoListPvt[i]);
        const newTask = await temp.save();
        toDoList.tasks.push(newTask._id);
      }
      const newToDoList = await toDoList.save();
      const temp2 = await User.findByIdAndUpdate(
        user._id.toString(),
        { projectsToDoList: newToDoList._id },
        { new: true }
      );
    }
  }
};

const seed = async () => {
  await saveUsers(users);
  await saveToDoList(toDoListPvt);
  await saveProjects(projects);
}

seed();
