//jshint esversion:8
const uploadData = () => {
  const mongoose = require("mongoose");
  const user = require("../model/User");
  const csv = require("csv-parser");
  const { Bcrypt } = require('bcrypt-rust-wasm');
  const dotenv = require("dotenv");
  var q = [];
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
        .on("data", (row) => {
          const bcrypt = Bcrypt.new(parseInt(process.env.SALT_ROUNDS));
          const hash = bcrypt.hashSync(row.password);
          row.password = hash;
          row._id = new mongoose.Types.ObjectId();
          q=q.concat(row);
        })
        .on("end", ()=>{
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
