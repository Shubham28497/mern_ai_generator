const User = require("../models/User");
//*Registration
const register = (req, res) => {
  try {
    const { username, email, password } = req.body;
    //* Validate
    if(!username||!email||!password){
        res.status(400)
        throw new Error("All fields are required")
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
