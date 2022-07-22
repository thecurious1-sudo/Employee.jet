const express = require("express");
const port = 3000;
const app = express();
const db=require("./config/mongoose");
const path=require("path");


app.use(express.urlencoded());
app.use(express.json());
app.set(`view engine` , `ejs`);
app.set(`views`, path.join(__dirname, `views`));
app.use(express.static(`./asset`));


const expressLayouts =  require(`express-ejs-layouts`);
app.use(expressLayouts);
// Extracting styles and scripts
app.set(`layout extractStyles` , true);
app.set(`layout extractScripts` , true);

// For User Authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passportLocalStrategies');

app.use(session({
    name: `Employee.Jet`,
    // TODO change the secret before deployment in production mode
    secret: `blahblah`,
    saveUninitialized: false, //It means that data will not be saved in cookies until signin is there
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    // store: new MongoStore({
    //     mongoUrl: 'mongodb://localhost/EmployeeJet',
    //     // mongooseConnection: db,
    //     autoRemove: 'disabled'
    // }, function(err){
    //     console.log(err || `connect mongo ok`);
    // }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));


//start server
app.listen(port, err => {

    if(err)
    {
        console.log("Error starting the server");
    }
    console.log("Server started on port 3000");
});

