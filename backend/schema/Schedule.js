const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Schedule = new Schema({
  class_id: ObjectId,
  date: Date,
  available: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("Schedule", Schedule);
