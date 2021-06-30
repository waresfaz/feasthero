const { mailSender, getMessageTemplate } = require('../../../helpers/send_email');
const getClassDetailsFromId = require('../../../helpers/get_class_from_id');
const customerBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template')
const genCustomerBookingConfirmedData = require('../templates/customer_booking_confirmed_data');
const chefBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template');
const genChefBookingConfirmedData = require('../templates/chef_booking_confirmed_data');

async function sendMailToChefAndCustomer(order) {
    let class_ = await getClassDetailsFromId(order.class_id);
    await sendMailToCustomer(class_, order);
    await sendMailToChef(class_, order);
}

async function sendMailToCustomer(class_, order) {
    let msg = getMessageTemplate();
    msg.to = order.customer_email;
    msg.subject = "FeastHero Class Booking Confirmation";
    msg.html = customerBookingConfirmedEmailTemplate(genCustomerBookingConfirmedData(class_, order));

    // TODO get sendgrid api keys
    // await mailSender(msg);
};

async function sendMailToChef(class_, order) {
    let msg = getMessageTemplate();
    msg.to = class_.chefs[0].email;
    msg.subject = ` FeastHero Class ${class_.title}  Slot Booked`;
    msg.html = chefBookingConfirmedEmailTemplate(genChefBookingConfirmedData(class_, order));

    // await mailSender(msg);
};

module.exports = sendMailToChefAndCustomer;