const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chef = new Schema({
  name: String,
  photo: String,
  bio: String,
  email: String,
  zoom: String,
});
module.exports = mongoose.model("Chef", Chef);
