const ProcessBooking = require('../services/process_class_booking');
const StatusCodes = require('http-status-codes');

async function processBooking(req, res) {
    let bookingDetails = req.session.bookingDetails;

    const bookingAndPaymentResult = await (new ProcessBooking(bookingDetails, req.body.cardTokenId).process());

    if (bookingAndPaymentResult.statusCode === 200) {
        req.session.bookingId = bookingAndPaymentResult.info;
        req.session.save();
    }

    return res.status(bookingAndPaymentResult.statusCode).json({ response: bookingAndPaymentResult.info });
};


module.exports = processBooking