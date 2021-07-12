const sendMailToChefAndCustomer = require('./send_confirmed_emails');

/**
 * @description a class that implements all aspects of fulfilling a payment
 */
class ProcessPayment {
    constructor(bookingDetails, transactionDetails) {
        this.transactionDetails = transactionDetails;
        this.bookingDetails = bookingDetails;
    }

    async process() {
        // payment stuff here
        await sendMailToChefAndCustomer(this.bookingDetails);
    }

}

module.exports = ProcessPayment;