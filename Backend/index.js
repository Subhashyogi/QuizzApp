const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./Routers/UsersRouters");
const QuestionRouters = require("./Routers/QuestionRouters");
// require("dotenv").config();

// const OPENAI_API_KEY = process.env.API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/User", UserRouter);
app.use('/Question', QuestionRouters);

mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "Users",
  })
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("server started");
    });
  })
  .catch((error) => { 
    console.log(error.message);
  });
