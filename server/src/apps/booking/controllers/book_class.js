const ProcessBooking = require('../services/process_payment');
const TransactionDetails = require('../dto/transaction_details');

async function processBooking(req, res) {
    const orderDetails = req.session.bookingDetails;
    const transactionDetails = TransactionDetails.fromJson(req.body);

    const bookingAndPaymentResult = await (new ProcessBooking(orderDetails, transactionDetails).process());

    return res.status(bookingAndPaymentResult.statusCode).json({ response: bookingAndPaymentResult.info });
};


module.exports = processBooking