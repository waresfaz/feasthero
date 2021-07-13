const StatusCodes = require('http-status-codes');
const Booking = require('../schema/booking');

async function verifyBookingSuccess(req, res) {
    const bookedClassId = req.session.bookedClassId;
    const bookingDetailsFromDoc = await Booking.findOne({ _id: bookedClassId});
    if (bookingDetailsFromDoc)
        res.status(StatusCodes.OK).json({ response: bookingDetailsFromDoc });
    else
        res.status(StatusCodes.BAD_REQUEST).json({ response: 'not found' });
}

module.exports = verifyBookingSuccess;