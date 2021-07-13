const ProcessBooking = require('../services/process_class_booking');

async function processBooking(req, res) {
    let bookingDetails = req.session.bookingDetails;
    const bookingAndPaymentResult = await (new ProcessBooking(bookingDetails, req.body.cardTokenId).process());

    if (bookingAndPaymentResult.statusCode === 200) {
        req.session.bookedClassId = bookingAndPaymentResult.info;
        req.session.save();
    }

    return res.status(bookingAndPaymentResult.statusCode).json({ response: bookingAndPaymentResult.info });
};


module.exports = processBooking