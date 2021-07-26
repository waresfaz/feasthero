const { getMessageTemplate, mailSender } = require('../../../helpers/send_email');
const genCustomerBookingConfirmedData = require('../templates/customer_booking_confirmed_data');
const customerBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template');

async function shareConfirmation(emails, bookingDetails, classData) {
    let msg = getMessageTemplate()

    await emails.forEach(async email => {
        if (!email)
            return;
        msg.to = email;
        msg.subject = "FeastHero Class Booking Confirmation";
        msg.html = customerBookingConfirmedEmailTemplate(genCustomerBookingConfirmedData(classData, bookingDetails));
        await mailSender(msg);
    })
}

module.exports = shareConfirmation;