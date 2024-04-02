const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//*Registration
const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, trailActive } = req.body;
  //* Validate
  if (!username || !email || !password || !trailActive) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //* check the email is taken
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //* hash the user pass
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //* new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    trailActive,
  });
  //*add the date the trail will end
  newUser.trailExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );
  //* save the user
  await newUser.save();
  res.json({
    status: true,
    message: "Registration was successfull",
    user: {
      username,
      email,
      password: hashedPassword,
      trailActive,
    },
  });
});
//*Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //* check for user mail
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  //* check if password is valid
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  //*gen token jwt
  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  console.log(token);
  //*set the token into cookie(http only)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  //*send the response
  res.json({
    status: "Success",
    _id: user?._id,
    message: "Login Success",
    username: user?.username,
    email: user?.email,
  });
});
//*logout
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});
//*Profile
const userProfile=asyncHandler(async(req,res)=>{
  const id = "6608f0f726d0bbc8f588c5b3";
  const user=await User.findById(id)
  if(user){
    res.status(200).json({
      status:"Success",
      user,
    })
  }
  else{
    res.status(404)
    throw new Error("User not found")
  }
  })
//*Check user auth status
module.exports = {
  register,
  login,
  logout,
  userProfile
};
