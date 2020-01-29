const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation
} = require('../validation');

//REGISTRATION ROUTE
router.post('/register', async (req, res) => {

  //VALIDATE
  const {
    error
  } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //CHECK FOR EXISTING email
  const emailExists = await User.findOne({
    email: req.body.email
  });
  if (emailExists) {
    return res.status(400).send('Email already exists');
  }

  //HASH PASSWORDS
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send({
      user: user._id
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  //VALIDATE
  const {
    error
  } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //CHECK FOR EXISTING email
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    return res.status(400).send('Email doesnt exist');
  }
  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Password is wrong');
  }

  //Create a Token
  const token = jwt.sign({
    _id: user._id
  }, process.env.TOKEN_SECRET);
  res.header('auth-token', token)
     .send(token);
});
module.exports = router;
