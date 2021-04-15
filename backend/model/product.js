const mongoose = require("mongoose");
require("../db/db")

const ProductSchema = mongoose.Schema({
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
    price : {
        type : Number,
        required : true,
        min : 100,
        max : 100000,
    },
    description : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 20,
        maxLength : 150,
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 6,
        maxLength : 20,
    },
    is_cod : {
        type : Boolean,
        default : true
    },
    owner : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 6,
        maxLength : 25,
    }
})

module.exports = mongoose.model("Products", ProductSchema)

