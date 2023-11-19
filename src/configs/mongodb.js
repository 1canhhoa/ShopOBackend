const mongoose = require("mongoose");
let connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/E-shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
};
// export default connection
module.exports = connection;
