const mongoose = require("mongoose");
const User = require("../models/User");
const db = require("../config/mongoose");

const users = require("./data");

const saveUsers = async (users) => {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users saved");
}

saveUsers(users);
    