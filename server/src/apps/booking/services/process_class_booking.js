const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');
const StatusCodes = require('http-status-codes');
const ProcessPayment = require('./process_payment');

var ObjectId = require("mongoose").Types.ObjectId;


class ProcessClassBooking extends ProcessPayment {
    constructor(bookingDetails, cardTokenId) {
        super(bookingDetails, cardTokenId);
        this.bookingDetails = bookingDetails;
    }

    async process() {
        if (await this.isClassBooked() === true) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: `${bookingDetails.bookingDateTime} time slot is unavailable , please select a different slot`
            };
        }

        if (!await super.process())
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: 'payment failed'
            }

        await this.bookSlot();

        let bookedClass = await this.saveBookedClass();
        if (!bookedClass) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: 'class booking failed'
            }
        } else {
            return {
                statusCode: StatusCodes.OK,
                info: bookedClass,
            }
        }
    }

    async isClassBooked() {
        let bookedTime = await Schedule.findOne({
            classId: ObjectId(this.bookingDetails.classId),
            dateTime: this.bookingDetails.selectedClassDateTime.toDate(),
        });
        return bookedTime.avaliable === false;
    }

    async bookSlot() {
        await Schedule.updateOne(
            {
                classId: ObjectId(this.bookingDetails.classId),
                dateTime: this.bookingDetails.selectedClassDateTime.toDate(),
            },
            { available: false }
        );
    }

    async saveBookedClass() {
        let bookedClass = new Booking(this.orderDetails);
        return bookedClass
            .save()
            .then((bookedClass) => { return bookedClass._id })
            .catch((err) => { console.log(err); return false });
    }
}

module.exports = ProcessClassBooking;