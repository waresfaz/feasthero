const { StatusCodes } = require("http-status-codes");
const findClass = require('../../classes/services/find_class');
const Booking = require('../schema/booking');

async function verifyBookingSuccess(req, res) {
    const bookingId = req.session.bookingId;
    const bookingDetailsFromDoc = await Booking.findOne({ _id: bookingId });
    if (bookingDetailsFromDoc) {
        const classData = await findClass(bookingDetailsFromDoc.classId);
        return res.status(StatusCodes.OK).json({ bookingDetails: bookingDetailsFromDoc, classData: classData });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'not found' });
}

module.exports = verifyBookingSuccess;