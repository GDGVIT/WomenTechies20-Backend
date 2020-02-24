//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");
const Users = require("../model/User");

router.get("/",verify, (req, res) => {
  Users.find({})
    .select("-password")
    .then(users => {
      res.send(users);
    })
    .catch(err =>{
      res.send(err);
    });
});

module.exports = router;
