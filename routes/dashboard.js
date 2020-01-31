//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");
const Users = require("../model/User");

router.get("/", verify, async (req, res) => {
  const use = await Users.findOne({
    _id: req.user
  });
  res.send({
    name:use.name,
    email:use.email,
    regNo:use.regNo,
    gender:use.gender
  });
});

module.exports = router;
