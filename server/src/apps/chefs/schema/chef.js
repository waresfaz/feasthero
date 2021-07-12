const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chef = new Schema({
  firstName: String,
  lastName: String,
  photo: String,
  bio: String,
  email: String,
  zoom: String,
});
module.exports = mongoose.model("Chef", Chef);
