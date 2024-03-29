const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("connection string");
    console.log(`Mongodb Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
