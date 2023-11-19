const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email:{
      type: String
    },
    password: {
      type: String,
    },
    avatar:{
      type: String
    }
  }
);
const UserModel = mongoose.model("User", User);
module.exports = UserModel;
