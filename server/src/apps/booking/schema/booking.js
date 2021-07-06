const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Booking = new Schema({
  classId: ObjectId,
  customerEmail: String,
  customerFirstName: String,
  customerLastName: String,
  companyName: String,
  bookingSize: Number,
  bookingDatetime: Date,
  cost: Number,
  zoomLink: String,
  chefEmail: String,
  bookingStatus: String,
  lastUpdatedTimeStamp: {
    type: Date,
    default: new Date(),
  },
  bankTransactionId: String,
  bankApprovalCode: String,
  cardholder: String,
  responseCode: String,
  responseMessage: String,
  hasMealkit: Boolean, 
  // I want a booked mealkit field
});
module.exports = mongoose.model("Booking", Booking);
