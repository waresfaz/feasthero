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
  zoom_link: String,
  chef_email: String,
  booking_status: String,
  lastUpdatedTimeStamp: {
    type: Date,
    default: new Date(),
  },
  bank_transaction_id: String,
  bank_approval_code: String,
  cardholder: String,
  response_code: String,
  response_message: String,
  has_mealkit: Boolean, 
  // I want a booked_mealkit field
});
module.exports = mongoose.model("Booking", Booking);
