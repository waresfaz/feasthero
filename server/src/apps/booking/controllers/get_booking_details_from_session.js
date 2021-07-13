const StatusCodes = require('http-status-codes');

function getBookingDetailsFromSession(req, res) {
    const bookingDetails = req.session.bookingDetails;

    return res.status(StatusCodes.OK).json({ response: bookingDetails });
}

module.exports = getBookingDetailsFromSession;