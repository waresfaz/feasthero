const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');
const StatusCodes = require('http-status-codes');
const ProcessPayment = require('./process_payment');

var ObjectId = require("mongoose").Types.ObjectId;


class ProcessClassBooking extends ProcessPayment {
    constructor(orderDetails, transactionDetails) {
        super(orderDetails, transactionDetails);
        this.orderDetails = orderDetails;
    }

    async process() {
        if (await this.isClassBooked() === true) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: `${bookingInfo.bookingDateTime} time slot is unavailable , please select a different slot`
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
                info: this.bookedClass,
            }
        }
    }

    async isClassBooked() {
        let bookedTime = await Schedule.findOne({
            classId: ObjectId(this.bookingInfo.classId),
            $and: [
                {
                    date: { $gte: this.bookingInfo.bookingDateTime.toDate() },
                },
                {
                    date: {
                        $lte: this.bookingInfo.bookingDateTime.add(1, 'hour').toDate(),
                    },
                },
            ],
        });
        return bookedTime.avaliable === false;
    }

    async bookSlot(bookingInfo) {
        await Schedule.updateOne(
            {
                classId: ObjectId(bookingInfo.classId),
                $and: [
                    {
                        date: { $gte: bookingInfo.bookingDateTime.toDate() },
                    },
                    {
                        date: {
                            $lt: bookingInfo.bookingDateTime.add(1, 'hour').toDate()
                        },
                    },
                ],
            },
            { available: false }
        );
    }

    async saveBookedClass() {
        let bookedClass = new Booking(this.orderDetails);
        return bookedClass
            .save()
            .then((bookedClass) => { return bookedClass._id })
            .catch((_) => { return null });
    }
}

module.exports = ProcessClassBooking;