const TransactionDetails = require('../models/transaction_details');
const updateSlot = require('../../schedule/services/update_slot');
const CLIENT_ORIGIN = require('../../../feasthero/settings').settings.CLIENT_ORIGIN;
const sendMailToChefAndCustomer = require('../../booking/services/send_confirmed_emails');

/**
 * @description a class that implements all aspects of fulfilling a payment
 */
class ProcessPayment {
    constructor(req, orderDetails) {
        this.transaction = TransactionDetails.fromJson(req.body);
        this.orderDetails = orderDetails;
    }

    async process() {
        await sendMailToChefAndCustomer(this.orderDetails);
        return true;
        /*return this.res.redirect(
            `${CLIENT_ORIGIN}/payment-success?order-id=` + this.orderDetails.orderId
        );
        */
    }

}

module.exports = ProcessPayment;