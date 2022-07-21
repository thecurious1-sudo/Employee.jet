const mongoose=require("mongoose");
const User = require("../models/User");

module.exports.login = async (req, res) => {
    const { empId, password } = req.body;
    const user = await User.findOne({ empId });
    if (!user) {
        return res.status(400).send("User not found");
    }
    if (user.password !== password) {
        return res.status(400).send("Incorrect password");
    }
    res.send(req.body);
}

module.exports.renderLogin = async (req, res) => {
    res.render('login');
}
