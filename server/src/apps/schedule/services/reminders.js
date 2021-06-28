const Class = require("./schema/Class");
const Booking = require("./schema/Booking");
const { mailSender } = require("./api-handler/api-helper");
const sgMail = require("@sendgrid/mail");
const getreminderToCustomer = require('./templates/reminder_to_customer');
const getReminderToChef = require('./template/reminder_to_chef');
const genReminderToChefData = require('./template/reminder_to_chef_obj');
const moment = require("moment");
const genReminderToCustomerData = require("../templates/reminder_to_customer_data");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// basic msg template
let msg = {
    to: null,
    from: process.env.SENDGRID_MAIL,
    bcc: process.env.SENDGRID_MAIL,
    subject: "Reminder - FeastHero Class Scheduled for tomorrow  ",
    html: null,
};

async function sendReminder() {
    try {
        // fetching all bookings which are scheduled for the next day
        let reminder_list = await Booking.find({
            booking_status: "success",
            $and: [
                {
                    booking_datetime: { $gte: moment.utc() },
                },
                {
                    booking_datetime: {
                        $lt: moment.utc(new Date()).add(1, "d"),
                    },
                },
            ],
        });

        // looping over this list , getting the class details and sending a reminder mail to the recipient
        for (var data in reminder_list) {
            let classes = await Class.aggregate([
                {
                    $match: { _id: reminder_list[data].class_id },
                },
                {
                    $project: {
                        title: 1,
                        cost: 1,
                        duration: 1,
                        chef_id: 1,
                        description: 1,
                        recipe: 1,
                    },
                },
                {
                    $lookup: {
                        from: "chefs",
                        localField: "chef_id",
                        foreignField: "_id",
                        as: "chefs",
                    },
                },
            ]);
            class_ = classes[0];

            /*============================= SENDING REMINDER MAIL TO THE CUSTOMER ================================*/
            msg.to = reminder_list[data].customer_email;
            msg.html = getreminderToCustomer(genReminderToCustomerData(reminder_list[data], class_.chefs[0], class_));
            await mailSender(msg);

            /*============================= SENDING REMINDER MAIL TO THE CHEF ================================*/
            msg.to = class_.chefs[0].email;
            msg.html = getReminderToChef(genReminderToChefData(reminder_list[data], class_.chefs[0], class_));
            await mailSender(msg);
        }
    } catch (e) {
        console.log(e);
    }
};
sendReminder();
