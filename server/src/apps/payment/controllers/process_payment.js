const ProcessPayment = require('../services/process_payment');
const Booking = require('../../booking/schema/booking');
const { settings } = require('../../../feasthero/settings');

async function processPayment(req, res) {
    try {
        let orderDetails = await Booking.find({ _id: req.body.order_id })[0]
        let processPayment = new ProcessPayment(req, res, orderDetails);
        return await processPayment.process();
    } catch (e) {
        console.log(e);
        return res.redirect(settings.ORIGIN);
    }
};


module.exports = processPayment