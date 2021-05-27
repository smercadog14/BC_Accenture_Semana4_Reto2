//import module mongoose
const mongoose = require("mongoose");

//create  model of collection reminder

const reminderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  date: { type: Date, default: Date.now },
  description: String,
});

//create on MongoDB
const Reminder = mongoose.model("reminder", reminderSchema);

//export model like module

module.exports = Reminder;
