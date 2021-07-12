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
        try {
            this.createCharge();
        } catch (error) {
            console.log(error);
            return false;
        }
        await sendMailToChefAndCustomer(this.bookingDetails);
        return true;
    }

    static dollarsToCents(dollars) {
        return Math.floor(dollars * 100);
    }

    createCharge() {
        stripe.charges.create(
            {
                amount: ProcessPayment.dollarsToCents(this.bookingDetails.grandTotal),
                currency: 'cad',
                source: this.cardTokenId,
                description: `Payment for FeastHero class at ${this.bookingDetails.selectedClassDateTime}`,
                receipt_email: this.bookingDetails.customerEmail
            },
            function (err, charge) {
                console.log(err)
                if (err)
                    new Error(`payment failed: ${err}`)
                else
                    console.log(`payment success: ${charge}`)
            }
        )
    }

}

module.exports = ProcessPayment;