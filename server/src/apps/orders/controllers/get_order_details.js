const Booking = require('../../booking/schema/booking');

// fetch order details based on the passed orderId
async function getOrderDetailsFromOrderId(req, res) {
    try {
        let orderId = req.params.orderId;
        let order = await Booking.find({ _id: orderId });
        return res.json({ error: false, data: order });
    } catch (e) {
        console.log(e);
        return res.json({ error: true, data: [] });
    }
};

module.exports = getOrderDetailsFromOrderId;