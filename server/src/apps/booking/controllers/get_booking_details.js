const Booking = require('../schema/booking');
const StatusCodes = require('http-status-codes');

async function getbookingDetailsFromBookingId(req, res) {
    try {
        let orderId = req.params.orderId;
        let order = await Booking.findOne({ _id: orderId });
        return res.json({ response: order });
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.BAD_REQUEST).json({ response: [] });
    }
};

module.exports = getbookingDetailsFromBookingId;