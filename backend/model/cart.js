const mongoose = require("mongoose");
require("../db/db");

const CartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
	products: [
        {
            type : mongoose.Schema.Types.ObjectId,
            product_id : mongoose.Schema.Types.ObjectId,
            ref : 'Products',
            quantity : {
                type : Number,
                default : 1,
            }
        }
    ]
});

module.exports = mongoose.model("Carts", CartSchema);
