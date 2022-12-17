require("dotenv").config({ path: require("find-config")(".env") });
const mongoose = require("mongoose");
// const dbUrl = "mongodb://0.0.0.0:27017/EmployeeJet";
const dbUrl = process.env.DB_URL;

const connectDB = (URL) => {
  return (
    mongoose
      .connect(URL)
      // .connect(dbUrl)
      .then(() => {
        console.log("Connection established!");
      })
      .catch((err) => {
        console.log(err);
      })
  );
};

module.exports = connectDB;
