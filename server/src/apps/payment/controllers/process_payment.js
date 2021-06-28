const services = require('./services');

// api which will be requested by moneris after transaction
async function processPayment(req, res) {
    try {
        let order_id = req.body.response_order_id;
        let response_code = req.body.response_code;
        let is_cancelled = req.body.is_cancelled;
        let transaction_details = {
            bank_transaction_id: req.body.bank_transaction_id,
            bank_approval_code: req.body.bank_approval_code,
            cardholder: req.body.cardholder,
            response_code: response_code,
            response_message: req.body.message,
            booking_status: "",
            lastUpdatedTimeStamp: new Date(),
        };

        let orderDetails = await Booking.find({ _id: order_id });
        if (is_cancelled) {
            await updateSlot(
                orderDetails[0].class_id,
                orderDetails[0].booking_datetime,
                true
            );
            await updateBookingStatus(order_id, {
                booking_status: "cancelled",
                lastUpdatedTimeStamp: new Date(),
            });
            return res.json({ error: false });
        }
        if (Number(response_code) >= 50 || response_code == "") {
            transaction_details.booking_status = "failed";
            await services.updateSlot(
                orderDetails[0].class_id,
                orderDetails[0].booking_datetime,
                true
            );
            await updateBookingStatus(order_id, transaction_details);
            return res.redirect(
                "https://www.feasthero.com/payment_failure?order_id=" + order_id
            );
            // response.redirect to failure page
        } else {
            transaction_details.booking_status = "success";
            await updateBookingStatus(order_id, transaction_details);
            await sendMailToRecipient(orderDetails);
            return res.redirect(
                "https://www.feasthero.com/payment_success?order_id=" + order_id
            );
            // return res.json({ response_code: response_code, booked_date: booked_date });
        }
    } catch (e) {
        console.log(e);
        return res.redirect("https://www.feasthero.com/");
    }
};

module.exports = processPayment