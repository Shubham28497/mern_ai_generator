const asyncHandler=require("express-async-handler")

const isAuthenticated=asyncHandler(async(req,res,next)=>{
    console.log("isAuthenticated")
    next();
})

module.exports=isAuthenticated