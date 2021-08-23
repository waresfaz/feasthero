const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TimeSlot = new Schema({
  dateTime: Date,
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("TimeSlot", TimeSlot);
