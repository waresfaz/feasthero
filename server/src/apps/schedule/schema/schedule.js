const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let Schedule = new Schema({
  classId: ObjectId,
  dateTime: Date,
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Schedule", Schedule);
