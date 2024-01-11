const mongoose = require("mongoose");
const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your shop name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your shop email address"],
    },
    pickupAddress: {
        name:String,
        phone:String,
        address:String,
        detailAddress:String
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "Seller",
    },
    avatar: {
        type: String,
        required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,  
  }
);
const ShopModel = mongoose.model("Shop", shopSchema);
module.exports = ShopModel;
