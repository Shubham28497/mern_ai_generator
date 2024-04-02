const express = require("express");
const cookieParser=require("cookie-parser")
require("dotenv").config()

const userRouter = require("./routes/userRouter");
const connectDB = require("./utils/connectDb");
const { errorHandler } = require("./middlewares/errorMiddlewares");
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
//* middlewares
app.use(express.json());
app.use(cookieParser()) //pass the cookie automatically
//*Routes
app.use("/api/v1/users", userRouter);
//* error handler middlewares
app.use(errorHandler);
//* start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
