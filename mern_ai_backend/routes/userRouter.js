const express = require("express");
const { register } = require("../controllers/usersController");
const userRouter = express.Router();

userRouter.post("/register", register);

module.exports = userRouter;
