const mongoose = require("mongoose");
require("../db/db")

const CommentSchema = mongoose.Schema({
    time_stamp : {
        type : Date,
        default : Date.now
    },
    comment : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 250,
    },
    product_id : {
        type : String,
        required : true,
    },
    user_id : {
        type : String,
        required : true,
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
    }
})

module.exports = mongoose.model("Comments", CommentSchema)