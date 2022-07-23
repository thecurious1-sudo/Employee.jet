const passport = require(`passport`);
const localStrategy = require(`passport-local`).Strategy;
const User = require(`../models/user`);
// const Post = require(`../models/posts`);

// Authentication using passport
passport.use(new localStrategy({
        usernameField: `empId`,
        // This is used for passing additional req to the function
        passReqToCallback: true
    // }, function (email, password, done) {
    }, function (req , empId , password, done) {
        // Find the user and establish the identity
        User.findOne({empId: empId} , (err , user)=>{
            if(err){
                // console.log(`Error in finding user from passport
                return done(err);
            }

            if(!user || user.password != password)
            {
                // console.log(`Invalid Username/Password`);
                return done(null , false);
            }
            
            return done(null , user);
        });
    }
));

// Serializing the user to decide whick key to keep in the cookies
passport.serializeUser(function(user , done){
    done(null , user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id , done){
    User.findById(id , (err , user)=>{
        if(err){
            console.log(`Error in deserializing the user`);
            return done(err);
        }
        return done(null , user);
    });
});

passport.checkAuthentication = function(req , res , next){
    if(req.isAuthenticated())
    {
        return next();
    }
    // If the user is not signed in
    return res.redirect(`/users/login`);
}

// Setting authenticated user views
passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;