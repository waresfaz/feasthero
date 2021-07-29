const { StatusCodes } = require("http-status-codes");
const findClass = require('../../classes/services/find_class');
const Booking = require('../schema/booking');

async function verifyBookingSuccess(req, res) {
    const bookingId = req.session.bookingId;
    const bookingDetailsFromDoc = await Booking.findOne({ _id: bookingId });
    if (bookingDetailsFromDoc) {
        const classData = await findClass(bookingDetailsFromDoc.classId);
        res.status(StatusCodes.OK).json({ response: { bookingDetails: bookingDetailsFromDoc, classData: classData } });
    }
    else
        res.status(StatusCodes.BAD_REQUEST).json({ response: 'not found' });
}

module.exports = verifyBookingSuccess;