const { StatusCodes } = require("http-status-codes");
const Booking = require('../schema/booking');
const dateTimeToMoment = require('../../../helpers/date_time_to_moment');
const findClass = require('../../classes/services/find_class');
const ValidateBookingDetails = require('../services/validate_booking_details');

/**
 * This controller runs the system that is responsible for storing a client's booking
 * details in a session.
 * 
 * A session is a way to persistently store data belonging to a client on the server.
 * @link https://en.wikipedia.org/wiki/Session_(computer_science)
 * 
 * This initializing booking session system is responsible for
 *      1. Correctly formatting the client's booked class time
 *      2. Validating the client's booking details
 *      3. Saving the validated booking details in the session
 */
async function initSession(req, res) {
    let bookingDetailsFromBody = req.body;
    const bookingDetails = {
        ...bookingDetailsFromBody,
        selectedClassDateTime: formatDateTime(bookingDetailsFromBody.selectedClassDateTime)
    };

    const validatedBookingDetails = await validate(bookingDetails);
    if (!validatedBookingDetails.valid)
        return res.status(StatusCodes.BAD_REQUEST).json('please restart your order: ' + validatedBookingDetails.errorMessage);

    req.session.bookingDetails = Booking(bookingDetails);
    req.session.save();

    return res.status(StatusCodes.OK).json('ok');
}

function formatDateTime(dateTime) {
    return new Date(dateTimeToMoment(dateTime))
}

async function validate(bookingDetails) {
    const classData = await findClass(bookingDetails.classId);
    const validateBookingDetails = new ValidateBookingDetails(bookingDetails, classData);
    const validatedBookingDetails = await validateBookingDetails.validate();
    return validatedBookingDetails
}

module.exports = initSession;