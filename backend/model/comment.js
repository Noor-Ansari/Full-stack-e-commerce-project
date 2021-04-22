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
        minLength : [3, 'Comment should be atleast 5 characters long.'],
        maxLength : [200, 'Comment should be atmost 200 characters long.'],
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Products'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
    }
})

module.exports = mongoose.model("Comments", CommentSchema)