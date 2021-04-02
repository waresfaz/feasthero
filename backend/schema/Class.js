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
  has_mealkit: {
    type: Boolean,
    default: false,
  },
  mealkit_price: {
    type: Number,
    default: 0,
  },
  recipe: Array,
});
module.exports = mongoose.model("Class", Class);
