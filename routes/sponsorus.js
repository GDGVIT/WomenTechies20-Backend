//jshint esversion:6
const router = require("express").Router();
const Sponsor = require("../model/Sponsor");
const request = require('request');
const { sponsorValidation } = require("../validation");

router.post("/", (req, res) => {
  //VALIDATE
  let token = req.header("g-recaptcha-response");
 
  if (!token) {
    return res.json({ responseCode: 1, responseDesc: "Please select captcha" });
  }

  const { error } = sponsorValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  var secretKey = process.env.reCAPTCHA_KEY;
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token +
    "&remoteip=" +
    req.connection.remoteAddress;
  request(verificationUrl, function(_error, _response, body) {
    body = JSON.parse(body);
    if (body.success !== undefined && !body.success) {
      return res.json({
        responseCode: 1,
        responseDesc: "Failed captcha verification"
      });
    } else {
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
    }
  });
});

module.exports = router;
