const mongoose = require("mongoose");
require("../db/db")

const UserSchema = mongoose.Schema({
    id : {
        type : Number,
        default : Date.now
    },
    name : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 6,
        maxLength : 25,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 6,
        maxLength : 30,
    },
})

module.exports = mongoose.model("Users", UserSchema)