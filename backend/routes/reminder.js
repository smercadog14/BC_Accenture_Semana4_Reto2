//import required modules from npm
const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminder");
const User = require("../models/user");
const Auth = require("../middleware/auth");

//register the new reminder
router.post("/saveReminder", Auth, async (req, res) => {
  //get user
  const user = await User.findById(req.user._id);
  //if not exist
  if (!user) return res.status(400).send("User Without Autentication");
  //if exist create the new reminder
  const reminder = new Reminder({
    userId: user._id,
    name: req.body.name,
    description: req.body.description,
  });
  //save the new reminder
  const result = await reminder.save();
  //return result
  return res.status(200).send({ result });
});

//export route like module
module.exports = router;
