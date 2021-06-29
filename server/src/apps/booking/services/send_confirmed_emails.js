const { mailSender, getMessageTemplate: get_message_template } = require('../../../helpers/send_email');
const getClassDetailsFromId = require('../../../helpers/get_class_from_id');
const customer_booking_confirmed_email_template = require('../templates/customer_booking_confirmed_template')
const gen_customer_booking_confirmed_data = require('../templates/customer_booking_confirmed_data');
const chef_booking_confirmed_email_template = require('../templates/customer_booking_confirmed_template');
const gen_chef_booking_confirmed_data = require('../templates/chef_booking_confirmed_data');

async function send_mail_to_chef_and_customer(order) {
    let class_ = await getClassDetailsFromId(order.class_id);
    await send_mail_to_customer(class_, order);
    await sendMailToChef(class_, order);
}

async function send_mail_to_customer(class_, order) {
    let msg = get_message_template();
    msg.to = order.customer_email;
    msg.subject = "FeastHero Class Booking Confirmation";
    msg.html = customer_booking_confirmed_email_template(gen_customer_booking_confirmed_data(class_, order));

    await mailSender(msg);
};

async function sendMailToChef(class_, order) {
    msg.to = class_.chefs[0].email;
    msg.subject = ` FeastHero Class ${class_.title}  Slot Booked`;
    msg.html = chef_booking_confirmed_email_template(gen_chef_booking_confirmed_data(class_, order));

    await mailSender(msg);
};

module.exports = send_mail_to_chef_and_customer;