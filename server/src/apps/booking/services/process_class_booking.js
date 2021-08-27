const Booking = require('../schema/booking');
const Class = require('../../classes/schemas/class');
const { StatusCodes } = require("http-status-codes");
const ProcessPaymentService = require('./process_payment');


class ProcessClassBookingService {
    constructor(bookingDetails, cardTokenId) {
        this.processPayment = new ProcessPaymentService(bookingDetails, cardTokenId);
        this.bookingDetails = bookingDetails;
    }

    async book() {
        if (await this._isClassBooked()) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                errors: { errors: { booking: `${dateTimeToMoment(new Date(this.bookingDetails.selectedClassDateTime))} time slot is unavailable , please select a different slot` } }
            };
        }

        if ((await this.processPayment.process()) === false) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                errors: { errors: { payment: 'payment failed' } }
            }
        }

        await this._bookSlot();

        let bookedClass = await this._saveBookedClass();
        if (!bookedClass) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                errors: { errors: { booking: 'class booking failed' } }
            }
        } else {
            return {
                statusCode: StatusCodes.OK,
                bookedClassId: bookedClass,
            }
        }
    }

    async _isClassBooked() {
        const bookedTimeSlot = await Class.findOne(
            { _id: this.bookingDetails.classId, },
            { 'schedule': { $elemMatch: { dateTime: this.bookingDetails.selectedClassDateTime } } }
        ).then((doc) => doc.schedule[0])
        return bookedTimeSlot.available === false;
    }

    async _bookSlot() {
        await Class.updateOne(
            { _id: this.bookingDetails.classId, 'schedule': { $elemMatch: { dateTime: this.bookingDetails.selectedClassDateTime } } },
            { '$set': { 'schedule.$.available': false } },
        );
    }

    async _saveBookedClass() {
        let bookedClass = new Booking(this.bookingDetails);
        return bookedClass
            .save()
            .then((bookedClass) => { return bookedClass._id })
            .catch((_) => { return false });
    }
}

module.exports = ProcessClassBookingService;