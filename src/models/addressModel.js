const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    name:{
        type:String
    },
    phone:{
        type:Number
    }
    ,address:{
        type:String
    },
    addressOther:{
        type:String
    },
    homeOrWork:{
        type:String
    },
    default:{
        type:Boolean
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },

});
const addressModel = mongoose.model("address", addressSchema);
module.exports = addressModel