const express = require("express");
const userRouter = require("../routes/userRouter");
const connectDB = require("./connectDb");
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
//*Routes
app.use("/api/v1/users", userRouter);

//* start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
