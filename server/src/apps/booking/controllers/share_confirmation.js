const { StatusCodes } = require("http-status-codes");

const findClass = require('../../classes/services/find_class_unfiltered');
const shareConfirmationService = require('../services/share_confirmation');

/**
 * This controller runs the system for sharing a booking confirmation
 * 
 * This share confirmation system is responsible for
 *      1. Generating booking confirmation emails and sending them to a list of emails provided by the client
 */
async function shareConfirmation(req, res) {
    const bookingDetails = req.session.bookingDetails;
    const classData = await findClass(bookingDetails.classId);
    const emailsToSendTo = req.body.emails;

    return await shareConfirmationService(emailsToSendTo, bookingDetails, classData)
        .then((_) => res.status(StatusCodes.OK).json('ok'))
        .catch((err) => { console.log(err); return res.status(StatusCodes.BAD_REQUEST).json({ error: 'error' }) });
}

module.exports = shareConfirmation;