const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./Routers/UsersRouters");
const QuestionRouters = require("./Routers/QuestionRouters");
require("dotenv").config();

// require("dotenv").config();

// const OPENAI_API_KEY = process.env.API_KEY;
const port = process.env.PORT;
const DB = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/User", UserRouter);
app.use("/Question", QuestionRouters);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("The app is listening on port " + port);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
