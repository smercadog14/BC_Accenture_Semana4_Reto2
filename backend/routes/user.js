//import modules from npm
const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const User = require("../models/user");

//we use post to register a new user
router.post("/registerUser", async (req, res) => {
  //search if and document have the new email
  let user = await User.findOne({ email: req.body.email });
  //if exist return alert message
  if (user) return res.status(400).send("El usuario ya existe");
  //encrypt pass
  const hash = await bycrypt.hash(req.body.password, 10);
  //get the other document's data
  user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash, //the pass is the hash (encrypted password)
  });

  const result = await user.save();
  if (result) {
    //create jwt and send like response
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Cant register the new User");
  }
});

//export route like module

module.exports = router;
