const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');
const StatusCodes = require('http-status-codes');
const ProcessPayment = require('./process_payment');

var ObjectId = require("mongoose").Types.ObjectId;


/**
 * Book a class for a customer
 * 
 * @since 2.0.0
 * 
 * @see {ProcessPayment}
 */
class ProcessClassBooking extends ProcessPayment {

    /**
     * @param {Object} bookingDetails - customer's booking details
     * @param {String} cardTokenId - card token id generated by stripe 
     */
    constructor(bookingDetails, cardTokenId) {
        super(bookingDetails, cardTokenId);
        this.bookingDetails = bookingDetails;
    }

    /**
     * process the booking
     * 
     * @returns {Object} - status code and additional info to be sent to client
     */
    async process() {
        if (await this._isClassBooked() === true) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                info: `${this.bookingDetails.selectedClassDateTime} time slot is unavailable , please select a different slot`
            };
        }

        if ((await super.process()) === false) {
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
                info: bookedClass,
            }
        }
    }

    /**
    * @access private
    */
    async _isClassBooked() {
        let bookedTime = await Schedule.findOne({
            classId: ObjectId(this.bookingDetails.classId),
            dateTime: this.bookingDetails.selectedClassDateTime,
        });
        return bookedTime.avaliable === false;
    }

    /**
    * @access private
    */
    async _bookSlot() {
        await Schedule.updateOne(
            {
                classId: ObjectId(this.bookingDetails.classId),
                dateTime: this.bookingDetails.selectedClassDateTime,
            },
            { available: false }
        );
    }

    /**
     * @access private
     */
    async _saveBookedClass() {
        let bookedClass = new Booking(this.bookingDetails);
        return bookedClass
            .save()
            .then((bookedClass) => { return bookedClass._id })
            .catch((err) => { return false });
    }
}

module.exports = ProcessClassBooking;