const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Class = new Schema({
  title: String,
  cost: Number,
  thumbnail: String,
  description: String,
  duration: Number,
  chefId: ObjectId,
  hasMealKit: {
    type: Boolean,
    default: false,
  },
  mealKitPrice: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Class", Class);
