const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Booking = new Schema({
  class_id: ObjectId,
  customer_email: String,
  customer_first_name: String,
  customer_last_name: String,
  company_name: String,
  booking_size: Number,
  booking_datetime: Date,
  cost: Number,
  chef_id: ObjectId,
  zoom_link: String,
  chef_email: String,
  booking_status: String,
  lastUpdatedTimeStamp: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Booking", Booking);
