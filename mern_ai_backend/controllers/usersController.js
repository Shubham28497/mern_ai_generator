const User = require("../models/User");
//*Registration
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //* Validate
    if(!username||!email||!password){
        res.status(400)
        throw new Error("All fields are required")
    }
    //* check the email is taken
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }
    res.json({
      status: true,
      message: "Registration was successfull",
    });
  } catch (error) {}
};
//*Login
//*logout
//*Profile
//*Check user auth status
module.exports = {
  register,
};
