const mongoose = require("mongoose");
require("../db/db");

const CartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Users'
    },
	products: [
        {
            added_at : {
                type : Date,
                default : Date.now
            },
            product_id : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'Products',
            },
            quantity : {
                type : Number,
                default : 1,
            }
        }
    ]
});

module.exports = mongoose.model("Carts", CartSchema);
