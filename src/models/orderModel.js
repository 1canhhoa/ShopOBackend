const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products:{
        type:Array
    },
    orderBy:{
        type: mongoose.Types.ObjectId,
        // ref:'User'
    }, 
    userId:{
        type:String
    },
    totalPrice:{
        type:Number
    },
    checkoutBy:{
        type:String,
        default:'cashOnDelivery',
        emum:['cashOnDelivery','paypal','crebitCard']
    },
    stillInStock:{
        type:String,
        default:'InStock',
        emum:['InStock','outOfStock']
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    completeAt:{
        type: Date,
    }

});
const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel