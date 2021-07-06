const ProcessPayment = require('../services/process_payment');
const Booking = require('../../booking/schema/booking');
const { settings } = require('../../../feasthero/settings');

async function processPayment(req, res) {
    console.log('hit')
    try {
        let orderDetails = await Booking.findOne({ _id: req.body.responseOrderId });
        let processPayment = new ProcessPayment(req, res, orderDetails);
        return await processPayment.process();
    } catch (e) {
        console.log(e);
        return res.redirect(settings.ORIGIN);
    }
};


module.exports = processPayment