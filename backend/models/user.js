//import modules
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//create model of collection user

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});

//generate jwt for user

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      iat: moment().unix(),
    },
    "secetJWT-Reminder"
  );
};

//create on MongoDB

const User = mongoose.model("user", userSchema);

module.exports = User;
