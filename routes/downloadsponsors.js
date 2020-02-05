//jshint esversion:8
const router = require("express").Router();
const Sponsor = require("../model/Sponsor");
const json2csv = require("json2csv").parse;
let q = [];
router.get("/", async (req, res) => {
  if(req.body.passowrd !== process.env.SPONSOR_PASS)
  {
    res.send("Incorrect Password");
  }
  await Sponsor.find()
    .select("-_id -__v")
    .then(sponsors => {
      q = sponsors;
    })
    .catch(err => {
      res.send(err);
    });
  var sponsordetail=Object.assign(q);
  const fields = ["name","company","email","phone"];
  const headers= {fields};
  const csvString = json2csv(sponsordetail,headers);
  res.setHeader("Content-disposition", "attachment; filename=sponsors.csv");
  res.status(200).send(csvString);
});
module.exports = router;
