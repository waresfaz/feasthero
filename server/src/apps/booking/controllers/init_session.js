const StatusCodes = require('http-status-codes');
const Booking = require('../schema/booking');
const dateTimeToMoment = require('../../../helpers/date_time_to_moment');
const validateBookingDetails = require('../services/validate_booking_details');

async function initSession(req, res) {
    let bookingDetailsFromBody = req.body;
    const bookingDetails = {
        ...bookingDetailsFromBody,
        selectedClassDateTime: new Date(dateTimeToMoment(bookingDetailsFromBody.selectedClassDateTime))
    };

    const bookingDetailsError = await validateBookingDetails(bookingDetails);
    if (bookingDetailsError)
        return res.status(StatusCodes.BAD_REQUEST).json({ response: 'please restart your order: ' + bookingDetailsError });

    req.session.bookingDetails = Booking(bookingDetails);
    req.session.save();
    return res.status(StatusCodes.OK).json({ response: 'ok' });
}

module.exports = initSession;