const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Schedule = new Schema({
  class_id: ObjectId,
  chef_id: ObjectId,
  date: Date,
  available: Boolean,
});
module.exports = mongoose.model("Schedule", Schedule);
