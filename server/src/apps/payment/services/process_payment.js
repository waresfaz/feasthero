const { BookingStatusEnum } = require('../../booking/enums/booking_status');
const TransactionDetails = require('../models/transaction_details');
const updateBookingStatus = require('../../booking/services/update_booking_status');
const updateSlot = require('./update_slot');
const ORIGIN = require('../../../feasthero/settings').settings.ORIGIN;
const sendMailToChefAndCustomer = require('../../booking/services/send_confirmed_emails');

class ProcessPayment {
    constructor(req, res, order_details) {
        this.transaction = TransactionDetails.fromJson(req.body);
        this.order_details = order_details;
        this.response_code = req.response_code;
        this.res = res;
    }

    async process() {
        if (this.transaction.is_cancelled)
            return await this.cancel();

        if (Number(this.response_code) >= 50 || this.response_code == "")
            return await this.failed();

        return await this.success();
    }

    async success() {
        await updateBookingStatus(this.order_details.order_id, BookingStatusEnum.success);
        await sendMailToChefAndCustomer(this.order_details);
        return res.redirect(
            `${ORIGIN}/payment_success?order_id=` + this.order_details.order_id
        );
    }

    async failed() {
        await updateSlot(
            this.order_details.class_id,
            this.order_details.booking_datetime,
            { available: true }
        );
        await updateBookingStatus(order_id, BookingStatusEnum.failed);
        return this.res.redirect(
            `${ORIGIN}/payment_failure?order_id=` + this.order_details.order_id
        );
    }

    async cancel() {
        await updateSlot(
            this.order_details.class_id,
            this.order_details.booking_datetime,
            { available: true }
        );
        await updateBookingStatus(this.order_details.order_id, {
            booking_status: BookingStatusEnum.cancelled,
            lastUpdatedTimeStamp: new Date(),
        });
        return this.res.json({ error: false });
    }
}

module.exports = ProcessPayment;