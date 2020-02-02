//jshint esversion:6
const router = require("express").Router();
const Sponsor = require("../model/Sponsor");
const { sponsorValidation } = require("../validation");

router.post("/", (req, res) => {
  //VALIDATE
  const { error } = sponsorValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const sponsor = new Sponsor({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone
  });
  sponsor
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

module.exports=router;