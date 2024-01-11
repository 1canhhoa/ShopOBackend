const mongoose = require("mongoose");
let connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://nhamvanhien31102002:%40Hien2002@cluster0.ybmyoq3.mongodb.net/E-shop?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
};
module.exports = connection;
