const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TimeSlot = new Schema({
  dateTime: Date,
  available: Boolean,
});

module.exports = mongoose.model("TimeSlot", TimeSlot);
