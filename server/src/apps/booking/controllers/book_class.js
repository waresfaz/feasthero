const OrderDetails = require('../models/order_details')
const ProcessClassBooking = require('../services/process_class_booking'); 

async function bookClass(req, res) {
        const orderDetails = new OrderDetails.fromJson(req.body.data);
        let processClassBooking = new ProcessClassBooking(req, orderDetails);
        let status = processClassBooking.process();
        res.status(status.statusCode).json({ response: status.info });
};

module.exports = bookClass;