//jshint esversion:6
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  regNo: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  github: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model("Users", userSchema);
