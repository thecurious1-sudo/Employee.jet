const mongoose = require("mongoose");
const User = require("../models/User");
const ToDo = require("../models/toDoList");
const db = require("../config/mongoose");

const users = require("./data").users;
const toDoListPvt = require("./data").todoDataPvt;

const saveUsers = async (users) => {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users saved");
}


const saveToDoList_five = async(toDoListPvt) => {
     const user=await User.findOne({empId: "5"});
     const pvtToDoList= new 
     user.pvtToDoList
}

saveUsers(users);
    