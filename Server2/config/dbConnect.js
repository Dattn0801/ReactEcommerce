const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    //disable strict query
    mongoose.set("strictQuery", false);

    //connect to database
    mongoose.connect(process.env.CONNECTION_STRING, {});

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
