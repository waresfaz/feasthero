const StatusCodes = require('http-status-codes');
const Booking = require('../schema/booking');
const dateTimeToMoment = require('../../../helpers/date_time_to_moment');

async function initSession(req, res) {
    let bookingDetails = req.body;
    bookingDetails.selectedClassDateTime = new Date(dateTimeToMoment(bookingDetails.selectedClassDateTime));
    req.session.bookingDetails = Booking(bookingDetails);
    req.session.save();
    return res.status(StatusCodes.OK).json({ response: 'ok' });
}

module.exports = initSession;