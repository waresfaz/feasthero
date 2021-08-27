const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TimeSlot = require("./time_slot").schema;

const Class = new Schema({
  title: String,
  costPerDevice: Number,
  thumbnail: String,
  description: String,
  duration: Number,
  chefId: ObjectId,
  hasMealKit: {
    type: Boolean,
    default: false,
  },
  mealKitCost: {
    type: Number,
    default: 0,
  },
  schedule: {
    type: [TimeSlot]
  }
});

module.exports = mongoose.model("Class", Class);
