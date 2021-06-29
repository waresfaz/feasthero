// fetch order details based on the passed order_id
async function getOrderDetailsFromOrderId(req, res) {
    try {
        let order_id = req.params.order_id;
        let order = await Booking.find({ _id: order_id });
        return res.json({ error: false, data: order });
    } catch (e) {
        return res.json({ error: true, data: [] });
    }
};

module.exports = getOrderDetailsFromOrderId;