const Booking = require("../../booking/schema/booking");
const reminderToCustomerTemplate = require('./templates/reminder_to_customer');
const genReminderToCustomerData = require("../templates/reminder_to_customer_data");
const reminderToChefTemplate = require('./template/reminder_to_chef');
const genReminderToChefData = require('./template/reminder_to_chef_obj');
const { BookingStatusEnum, stringFromBookingStatus } = require('../../booking/enums/booking_status');
const { mailSender, getMessageTemplate } = require('../../../helpers/send_email');
const moment = require("moment");
const getClassDetailsFromId = require('../../../helpers/get_class_from_id');

// TODO this doesnt work yet

async function sendReminder() {
    try {
        let reminderList = await allBookings();

        for (var data in reminderList) {
            let class_ = await getClassDetailsFromId(reminderList[data].class_id);
            await sendEmailToCustomer(reminderList[data], class_);
            await sendEmailToChef(reminderList[data], class_);
        }
    } catch (e) {
        console.log(e);
    }
};

async function allBookings() {
    return await Booking.find({
        bookingStatus: stringFromBookingStatus(BookingStatusEnum.success),
        $and: [
            {
                bookingDateTime: { $gte: moment.utc() },
            },
            {
                bookingDateTime: {
                    $lt: moment.utc(new Date()).add(1, 'd'),
                },
            },
        ],
    });
}

async function sendEmailToCustomer(reminderData, classData) {
    let msg = getMessageTemplate();
    msg.to = reminderData.customerEmail;
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