//*Registration
const register = (req, res) => {
  res.json({
    status: true,
    message: "Registration was successfull",
  });
};
//*Login
//*logout
//*Profile
//*Check user auth status
module.exports = {
  register,
};
