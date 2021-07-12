const StatusCodes = require('http-status-codes');
const Booking = require('../schema/booking');

async function initBookingSession(req, res) {
    req.session.bookingDetails = Booking(req.body);
    req.session.save();
    return res.status(StatusCodes.OK).json({response: 'ok'});
}

module.exports = initBookingSession;