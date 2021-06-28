// updates the booking_status in bookings collection to success/failed/cancelled
async function updateBookingStatus(order_id, status) {
    await Booking.updateOne(
        {
            _id: ObjectId(order_id),
        },
        status
    );
    return;
};

module.exports = updateBookingStatus;