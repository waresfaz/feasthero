const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');
const { StatusCodes } = require("http-status-codes");
const ProcessPaymentService = require('./process_payment');

const ObjectId = require("mongoose").Types.ObjectId;

class ProcessClassBookingService {
    constructor(bookingDetails, cardTokenId) {
        this.processPayment = new ProcessPaymentService(bookingDetails, cardTokenId);
        this.bookingDetails = bookingDetails;
    }

    async process() {
        if (await this._isClassBooked()) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: `${this.bookingDetails.selectedClassDateTime} time slot is unavailable , please select a different slot`
            };
        }

        if ((await this.processPayment.process()) === false) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: 'payment failed'
            }
        }

        await this._bookSlot();

        let bookedClass = await this._saveBookedClass();
        if (!bookedClass) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: 'class booking failed'
            }
        } else {
            return {
                statusCode: StatusCodes.OK,
                bookedClassId: bookedClass,
            }
        }
    }

    async _isClassBooked() {
        let bookedTime = await Schedule.findOne({
            classId: ObjectId(this.bookingDetails.classId),
            dateTime: this.bookingDetails.selectedClassDateTime,
        });
        return bookedTime.avaliable === false;
    }

    async _bookSlot() {
        console.log(this.bookingDetails);
        await Schedule.updateOne(
            {
                classId: ObjectId(this.bookingDetails.classId),
                dateTime: this.bookingDetails.selectedClassDateTime,
            },
            { available: false }
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