const StatusCodes = require('http-status-codes');
const Booking = require('../schema/booking');
const dateTimeToMoment = require('../../../helpers/date_time_to_moment');

async function initBookingSession(req, res) {
    let bookingDetails = req.body;
    bookingDetails.selectedClassDateTime = dateTimeToMoment(bookingDetails.selectedClassDateTime).toDate();
    req.session.bookingDetails = Booking(bookingDetails);
    req.session.save();
    return res.status(StatusCodes.OK).json({response: 'ok'});
}

module.exports = initBookingSession;