//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");
const Users = require("../model/User");

router.get("/", verify, async (req, res) => {
  const use = await Users.findOne({
    _id: req.user
  });
  res.send(use.name);
});

module.exports = router;
