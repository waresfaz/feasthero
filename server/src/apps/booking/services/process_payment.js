const sendMailToChefAndCustomer = require('./send_confirmed_emails');

/**
 * @description a class that implements all aspects of fulfilling a payment
 */
class ProcessPayment {
    constructor(orderDetails, transactionDetails) {
        this.transactionDetails = transactionDetails;
        this.orderDetails = orderDetails;
    }

    async process() {
        // payment stuff here
        await sendMailToChefAndCustomer(this.orderDetails);
    }

}

module.exports = ProcessPayment;