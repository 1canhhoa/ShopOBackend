const mongoose = require("mongoose");
const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    idUser:{
      type:String
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
  }
);
const TestModel = mongoose.model("Test", testSchema);
module.exports = TestModel;
