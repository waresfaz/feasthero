const { mailSender, getMessageTemplate } = require('../../../helpers/send_email');
const getClassDetailsFromId = require('../../../helpers/get_class_from_id');
const customerBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template')
const genCustomerBookingConfirmedData = require('../templates/customer_booking_confirmed_data');
const chefBookingConfirmedEmailTemplate = require('../templates/chef_booking_confirmed_template');
const genChefBookingConfirmedData = require('../templates/chef_booking_confirmed_data');

class SendConfirmedEmails {
    constructor(bookingDetails) {
        this.bookingDetails = bookingDetails;
    }

    async sendMailToChefAndCustomer() {
        let classData = await getClassDetailsFromId(this.bookingDetails.classId);
        await this._sendMailToCustomer(classData);
        await this._sendMailToChef(classData);
    }

    async _sendMailToCustomer(classData) {
        let msg = getMessageTemplate();
        msg.to = this.bookingDetails.customerEmail;
        msg.subject = "FeastHero Class Booking Confirmation";
        msg.html = customerBookingConfirmedEmailTemplate(genCustomerBookingConfirmedData(classData, this.bookingDetails));
        await mailSender(msg);
    };

    async _sendMailToChef(classData) {
        let msg = getMessageTemplate();
        msg.to = classData.chefs[0].email;
        msg.subject = ` FeastHero Class ${classData.title}  Slot Booked`;
        msg.html = chefBookingConfirmedEmailTemplate(genChefBookingConfirmedData(classData, this.bookingDetails));
        await mailSender(msg);
    };

}

module.exports = SendConfirmedEmails;