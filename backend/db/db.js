const mongoose = require("mongoose");
require("../.env");

// const URI =  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@backend.nzdpm.mongodb.net/shoppingplaza?retryWrites=true&w=majority`

const URI = 'mongodb://localhost/shoppingplaza'

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
