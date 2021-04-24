const mongoose = require("mongoose");
require("../.env");

const URI = "mongodb+srv://noor_mohammad:civil.er@backend.nzdpm.mongodb.net/shoppingplaza?retryWrites=true&w=majority"


mongoose.connect(URI, { useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true });
const db = mongoose.connection;

db.on("connected", () => {
  console.log("database is connected succesfully");
});

db.on("disconnected", () => {
  console.log("database is disconnected succesfully");
});

db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;
