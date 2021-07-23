const { mailSender, getMessageTemplate } = require('../../../helpers/send_email');
const getClassDetailsFromId = require('../../../helpers/get_class_from_id');
const customerBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template')
const genCustomerBookingConfirmedData = require('../templates/customer_booking_confirmed_data');
const chefBookingConfirmedEmailTemplate = require('../templates/chef_booking_confirmed_template');
const genChefBookingConfirmedData = require('../templates/chef_booking_confirmed_data');

class SendConfirmedEmails {
    constructor(order) {
        this.order = order;
    }

    async sendMailToChefAndCustomer() {
        let class_ = await getClassDetailsFromId(this.order.classId);
        await this._sendMailToCustomer(class_);
        await this._sendMailToChef(class_);
    }

    async _sendMailToCustomer(class_) {
        let msg = getMessageTemplate();
        msg.to = this.order.customerEmail;
        msg.subject = "FeastHero Class Booking Confirmation";
        msg.html = customerBookingConfirmedEmailTemplate(genCustomerBookingConfirmedData(class_, this.order));
        await mailSender(msg);
    };

    async _sendMailToChef(class_) {
        let msg = getMessageTemplate();
        msg.to = class_.chefs[0].email;
        msg.subject = ` FeastHero Class ${class_.title}  Slot Booked`;
        msg.html = chefBookingConfirmedEmailTemplate(genChefBookingConfirmedData(class_, this.order));
        await mailSender(msg);
    };

}

module.exports = SendConfirmedEmails;