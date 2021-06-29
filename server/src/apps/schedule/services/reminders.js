const Booking = require("../../booking/schema/booking");
const reminderToCustomerTemplate = require('./templates/reminder_to_customer');
const genReminderToCustomerData = require("../templates/reminder_to_customer_data");
const reminderToChefTemplate = require('./template/reminder_to_chef');
const genReminderToChefData = require('./template/reminder_to_chef_obj');
const { BookingStatusEnum, string_from_booking_status } = require('../../booking/enums/booking_status');
const { mailSender, getMessageTemplate } = require('../../../helpers/send_email');
const moment = require("moment");
const getClassDetailsFromId = require('../../../helpers/get_class_from_id');

// TODO this doesnt work yet

async function sendReminder() {
    try {
        let reminder_list = await allBookings();

        for (var data in reminder_list) {
            let class_ = await getClassDetailsFromId(reminder_list[data].class_id);
            await sendEmailToCustomer(reminder_list[data], class_);
            await sendEmailToChef(reminder_list[data], class_);
        }
    } catch (e) {
        console.log(e);
    }
};

async function allBookings() {
    return await Booking.find({
        booking_status: string_from_booking_status(BookingStatusEnum.success),
        $and: [
            {
                booking_datetime: { $gte: moment.utc() },
            },
            {
                booking_datetime: {
                    $lt: moment.utc(new Date()).add(1, 'd'),
                },
            },
        ],
    });
}

async function sendEmailToCustomer(reminderData, classData) {
    let msg = getMessageTemplate();
    msg.to = reminderData.customer_email;
    msg.html = reminderToCustomerTemplate(genReminderToCustomerData(reminderData, classData.chefs[0], classData));
    await mailSender(msg);
}

async function sendEmailToChef(reminderData, classData) {
    let msg = getMessageTemplate();
    msg.to = classData.chefs[0].email;
    msg.html = reminderToChefTemplate(genReminderToChefData(reminderData, classData.chefs[0], classData));
    await mailSender(msg);
}

module.exports = sendReminder;