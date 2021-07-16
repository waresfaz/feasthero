const { settings } = require('../../../feasthero/settings');
const stripe = require('stripe')(settings.stripe.SECRET_KEY);
const sendMailToChefAndCustomer = require('./send_confirmed_emails');

/**
 * @description a class that implements all aspects of fulfilling a payment
 */
class ProcessPayment {
    constructor(bookingDetails, cardTokenId) {
        this.cardTokenId = cardTokenId;
        this.bookingDetails = bookingDetails;
    }

    async process() {
        const charge = await this.createCharge().catch(() => false);

        if (charge === false)
            return false;

        await sendMailToChefAndCustomer(this.bookingDetails);
        return true;
    }

    static dollarsToCents(dollars) {
        return Math.floor(dollars * 100);
    }

    async createCharge() {
        await stripe.charges.create(
            {
                amount: ProcessPayment.dollarsToCents(this.bookingDetails.grandTotal),
                currency: 'cad',
                source: '32432',
                description: `Payment for FeastHero class at ${this.bookingDetails.selectedClassDateTime}`,
                receipt_email: this.bookingDetails.customerEmail
            })
            .then((charge) => console.log(`payment success: ${charge}`))
            .catch((error) => { throw (new Error(`payment failed: ${error}`)) });
    }

}

module.exports = ProcessPayment;