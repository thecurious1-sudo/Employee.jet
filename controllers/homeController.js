const User = require('../models/User');

module.exports.home = async (req , res)=>{
    if(!req.user){
        return res.render('landingPage' , {
            layout: 'blank_layout',
            title: 'Employee.Jet'
        });
    }
    return res.render('home', {
        layout: 'blank_layout',
        title: 'Employee.Jet | Home'
    });
}