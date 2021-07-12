const dateTimeToMoment = require('../../../helpers/datetime_to_moment');
const ProcessBooking = require('../services/process_class_booking');

async function processBooking(req, res) {
    let bookingDetails = req.body.bookingDetails;

    bookingDetails.selectedClassDateTime = dateTimeToMoment(bookingDetails.selectedClassDateTime);

    const bookingAndPaymentResult = await (new ProcessBooking(bookingDetails, req.body.cardTokenId).process());
    console.log(bookingAndPaymentResult)
    return res.status(bookingAndPaymentResult.statusCode).json({ response: bookingAndPaymentResult.info });
};


module.exports = processBooking