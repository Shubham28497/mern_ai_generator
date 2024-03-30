const express = require("express");
require("dotenv").config()

const userRouter = require("../routes/userRouter");
const connectDB = require("./connectDb");
const { errorHandler } = require("../middlewares/errorMiddlewares");
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
//* middlewares
app.use(express.json());
//*Routes
app.use("/api/v1/users", userRouter);
//* error handler middlewares
app.use(errorHandler);
//* start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
