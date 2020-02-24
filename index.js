//jshint esversion:6
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

//MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
dotenv.config();
app.use(cors());
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
const postgitlink = require("./routes/postgit");
const getUsers = require("./routes/getusers");
const hashtaginsta = require("./routes/searchhash");
const sponsorus = require("./routes/sponsorus");
const downloadsponsors = require("./routes/downloadsponsors");
app.use("/api/user", authRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/postgit", postgitlink);
app.use("/api/getUsers", getUsers);
app.use("/api/hashtaginsta", hashtaginsta);
app.use("/api/sponsorus", sponsorus);
app.use("/api/sponsorus/download", downloadsponsors);

app.listen(process.env.PORT, () => console.log("Server is up and running"));
