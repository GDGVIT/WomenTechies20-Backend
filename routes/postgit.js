//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");
const Users = require("../model/User");

router.post("/", verify, async (req, res) => {
  Users.findByIdAndUpdate(req.user,{ $push: { github: req.body.github } } , err => {
    if (err) {
      console.error(err);
    }
    else{
      res.send("Pushed the URL of your repository");
    }
  });
});

module.exports = router;
