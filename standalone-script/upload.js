//jshint esversion:8
const uploadData = () => {
  const mongoose = require("mongoose");
  const user = require("../model/User");
  const csv = require("csv-parser");
  const bcrypt = require("bcryptjs");
  const dotenv = require("dotenv");
  let q = [];
  dotenv.config();
  // make a connection
  mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Connected to db");

      const fs = require("fs");
      fs.createReadStream("details1.csv")
        .pipe(csv())
        .on("data", async row => {
          // console.log(row);
          const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
          const hashPassword = await bcrypt.hash(row.password, salt);
          row.password = hashPassword;
          q.push(row);
        })
        .on("end", () => {
          user.collection.insertMany(q, err => {
            if (err) {
              console.error(err);
            } else {
              console.log("CSV file successfully uploaded");
              fs.unlinkSync("./details.csv");
              process.exit(0);
            }
          });
        });
    }
  );
};

module.exports.uploadData = uploadData;
