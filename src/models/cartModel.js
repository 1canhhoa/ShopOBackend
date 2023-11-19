const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId:{
        type: String
    },
    product:{
        type:Object
    }, 
    email:{
        type: String
    },
    quanti:{
        type:Number
    }
    ,class:{
        type:Number
    }
    ,capa:{
        type:Number
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },

});
const cartModel = mongoose.model("carts", cartSchema);
module.exports = cartModel