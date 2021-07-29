const { StatusCodes } = require("http-status-codes");
const Booking = require('../schema/booking');
const dateTimeToMoment = require('../../../helpers/date_time_to_moment');
const validateBookingDetails = require('../services/validate_booking_details');
const findClass = require('../../classes/services/find_class');
const ValidateBookingDetails = require('../services/validate_booking_details');

async function initSession(req, res) {
    let bookingDetailsFromBody = req.body;
    const bookingDetails = {
        ...bookingDetailsFromBody,
        selectedClassDateTime: new Date(dateTimeToMoment(bookingDetailsFromBody.selectedClassDateTime))
    };


    const areBookingDetailsValid = await validate(bookingDetails);
    if (!areBookingDetailsValid.valid)
        return res.status(StatusCodes.BAD_REQUEST).json('please restart your order: ' + areBookingDetailsValid.errorMessage);

    req.session.bookingDetails = Booking(bookingDetails);
    req.session.save();
    return res.status(StatusCodes.OK).json({ response: 'ok' });
}

async function validate(bookingDetails) {
    const classData = await findClass(bookingDetails.classId);
    const validateBookingDetails = new ValidateBookingDetails(bookingDetails, classData);
    const areBookingDetailsValid = await validateBookingDetails.validate();
    return areBookingDetailsValid
}

module.exports = initSession;