const mongoose = require("mongoose");
const User = require("../models/user");
const ToDo = require("../models/toDo");
const db = require("../config/mongoose");
const Task = require("../models/task");

const users = require("./data").users;
const toDoListPvt = require("./data").todoDataPvt;

const saveUsers = async (users) => {
  await User.deleteMany({});
  await User.insertMany(users);
  console.log("Users saved");
};

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
  //console.log(temp2);
};

saveUsers(users);
saveToDoList(toDoListPvt);
