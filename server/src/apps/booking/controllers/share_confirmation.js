const { StatusCodes } = require("http-status-codes");

const findClass = require('../../classes/services/find_class');
const shareConfirmationService = require('../services/share_confirmation');

async function shareConfirmation(req, res) {
    const bookingDetails = req.session.bookingDetails;
    const classData = await findClass(bookingDetails.classId);
    const emailsToSendTo = req.body.emails;

    await shareConfirmationService(emailsToSendTo, bookingDetails, classData)
        .then((_) => res.status(StatusCodes.OK).json({ response: 'ok' }))
        .catch((_) => res.status(StatusCodes.BAD_REQUEST).json({ response: 'error' }));
}

module.exports = shareConfirmation;