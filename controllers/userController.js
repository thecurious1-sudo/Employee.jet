const mongoose=require("mongoose");
const User = require("../models/User");

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

module.exports.logout = async (req , res) =>{
    req.logout(function (err) {
        if (err) {
            console.log(`Error in logging out`);
        }
        return res.redirect(`/`);
    });
}
