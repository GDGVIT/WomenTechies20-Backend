//jshint esversion:6
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
dotenv.config();

//CONNECT TO DATABASE
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("connected to DB")
);

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
app.use("/api/user", authRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(process.env.PORT, () => console.log("Server is up and running"));
