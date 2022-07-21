const mongoose = require("mongoose");
const dbUrl = 'mongodb://localhost:27017/EmployeeJet'
mongoose
.connect(dbUrl)
  // .connect(dbUrl)
  .then(() => {
    console.log("Connection established!");
  })
  .catch((err) => {
    console.log(err);
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

module.exports = db;