const { stringFromBookingStatus } = require('../enums/booking_status');
const Booking = require('../schema/booking');
var ObjectId = require("mongoose").Types.ObjectId;

// updates the booking_status in bookings collection to success/failed/cancelled
async function updateBookingStatus(orderId, status) {
    await Booking.updateOne(
        {
            _id: ObjectId(orderId),
        },
        stringFromBookingStatus(status)
    );
    return;
};

module.exports = updateBookingStatus;