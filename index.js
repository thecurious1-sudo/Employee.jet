const express = require("express");
const app = express();
const db=require("./config/mongoose");
const path=require("path");


app.use(express.urlencoded());
app.use(express.json());
app.set(`view engine` , `ejs`);
app.set(`views`, path.join(__dirname, `views`));
app.use(express.static(path.join(__dirname, `assets`)));
app.use('/', require('./routes'));


//start server
app.listen(3000, () => {
    console.log("Server started on port 3000");
}
);
