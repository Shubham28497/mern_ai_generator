const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  trailActive: {
    type: Boolean,
    required: true,
  },
  trailExpires: {
    type: Date,
  },
  subscription: {
    type: String,
    enum: ["Trail", "Free", "Basic", "Premium"],
  },
  apiRequestCount: {
    type: Number,
    default:0,
  },
});