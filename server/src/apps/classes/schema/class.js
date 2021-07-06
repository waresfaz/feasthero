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
  hasMealkit: {
    type: Boolean,
    default: false,
  },
  mealkitPrice: {
    type: Number,
    default: 0,
  },
  recipe: Array,
});
module.exports = mongoose.model("Class", Class);
