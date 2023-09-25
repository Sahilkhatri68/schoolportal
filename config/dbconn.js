require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("School DB is connected successfully...");
  } catch (error) {
    console.log("School DB not connected!....", error);
  }
};
module.exports = connectDB;
