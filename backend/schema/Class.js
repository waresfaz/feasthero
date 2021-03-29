const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Class = new Schema({
  title: String,
  cost: Number,
  thumbnail: String,
  description: String,
  duration: Number,
  chef_id: ObjectId,
});
module.exports = mongoose.model("Class", Class);
