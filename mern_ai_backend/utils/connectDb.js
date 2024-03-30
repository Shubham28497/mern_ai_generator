const mongoose = require("mongoose");
// require("dotenv").config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/mern-ai");
    console.log(`Mongodb Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
