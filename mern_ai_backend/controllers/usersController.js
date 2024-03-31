const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
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
    password,
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
const login=asyncHandler(async(req,res)=>{
const {email,password}=req.body
//* check for user mail
const user=await User.findOne({email})
if(!user){  
  res.status(401)
  throw new Error("Invalid email or password")
}
})
//*logout
//*Profile
//*Check user auth status
module.exports = {
  register,
};
