const mongoose = require("mongoose");
require("../db/db")

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 5,
        maxLength : 30,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 6,
        maxLength : 30,
    },
    password: {
        type: String,
        minLength : 5,
    }
})

module.exports = mongoose.model("Users", UserSchema)