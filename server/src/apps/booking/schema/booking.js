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
  subtotal: Number,
  hst: Number,
  timeBooked: {
    type: Date,
    default: new Date(),
  },
  mealKitBooked: Boolean
});
module.exports = mongoose.model("Booking", Booking);
