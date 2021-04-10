const mongoose = require("mongoose");
require("../.env");

const URI = "mongodb://localhost/shoppingplaza";
console.log(URI)
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on("connected", () => {
  console.log("database is connected succesfully");
});

db.on("disconnected", () => {
  console.log("database is disconnected succesfully");
});

db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;
