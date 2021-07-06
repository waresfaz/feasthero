const { BookingStatusEnum } = require('../../booking/enums/booking_status');
const TransactionDetails = require('../models/transaction_details');
const updateBookingStatus = require('../../booking/services/update_booking_status');
const updateSlot = require('./update_slot');
const CLIENT_ORIGIN = require('../../../feasthero/settings').settings.CLIENT_ORIGIN;
const sendMailToChefAndCustomer = require('../../booking/services/send_confirmed_emails');

/**
 * @description a class that implements all aspects of fulfilling a payment
 */
class ProcessPayment {
    constructor(req, res, orderDetails) {
        this.transaction = TransactionDetails.fromJson(req.body);
        this.orderDetails = orderDetails;
        this.responseCode = req.responseCode;
        this.res = res;
    }

    async process() {
        if (this.transaction.isCancelled)
            return await this.cancel();

        if (Number(this.responseCode) >= 50 || this.responseCode == "")
            return await this.failed();

        return await this.success();
    }

    async success() {
        await updateBookingStatus(this.orderDetails.orderId, BookingStatusEnum.success);
        await sendMailToChefAndCustomer(this.orderDetails);
        return this.res.redirect(
            `${CLIENT_ORIGIN}/payment-success?orderId=` + this.orderDetails.orderId
        );
    }

    async failed() {
        await updateSlot(
            this.orderDetails.classId,
            this.orderDetails.bookingDateTime,
            { available: true }
        );
        await updateBookingStatus(orderId, BookingStatusEnum.failed);
        return this.res.redirect(
            `${CLIENT_ORIGIN}/payment-failure?orderId=` + this.orderDetails.orderId
        );
    }

    async cancel() {
        console.log('ok');
        await updateSlot(
            this.orderDetails.classId,
            this.orderDetails.bookingDateTime,
            { available: true }
        );
        await updateBookingStatus(this.orderDetails.orderId, {
            bookingStatus: BookingStatusEnum.cancelled,
            lastUpdatedTimeStamp: new Date(),
        });
        return this.res.json({ error: false });
    }
}

module.exports = ProcessPayment;