const string_from_booking_status = require('../enums/booking_status');

// updates the booking_status in bookings collection to success/failed/cancelled
async function updateBookingStatus(order_id, status) {
    await Booking.updateOne(
        {
            _id: ObjectId(order_id),
        },
        string_from_booking_status(status)
    );
    return;
};

module.exports = updateBookingStatus;