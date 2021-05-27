//import modules from npm
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//import module of user
const User = require("../models/user");

//create login function
router.post("/login", async (req, res) => {
  //search the user on db whit the email from req
  const user = await User.findOne({ email: req.body.email });
  //validate if the email exist
  if (!user) return res.status(400).send("Email o password incorrecto");
  //validete if the user from req have the same pass that in DB
  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("Email o password incorrecto");

  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

//export route like module

module.exports = router;
