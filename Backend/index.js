const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./Routers/UsersRouters");
const QuestionRouters = require("./Routers/QuestionRouters");
// require("dotenv").config();

// const OPENAI_API_KEY = process.env.API_KEY;
const DBURL =
  "mongodb+srv://Monkey_D_Luffy:(@S1u2b3h4a5s6h7@)@quizzapp.laibk.mongodb.net/QuizzApp?retryWrites=true&w=majority&appName=quizzapp";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/User", UserRouter);
app.use("/Question", QuestionRouters);

mongoose
  .connect(DBURL, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
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
