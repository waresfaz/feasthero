const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Schedule = new Schema({
  dateTime: Date,
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Schedule", Schedule);
