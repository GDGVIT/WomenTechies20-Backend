//jshint esversion:6
const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  phone: {
    type: Number,
    required: true,
    min: 10
  }
});

module.exports = mongoose.model("Sponsor", sponsorSchema);
