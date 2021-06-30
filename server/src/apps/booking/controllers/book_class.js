const BookingInfo = require('../models/booking_info')
const isClassBooked = require('../services/is_class_booked');
const StatusCodes = require('http-status-codes');
const bookSlot = require('../services/book_slot');
const saveBookedClass = require('../services/book_class');

// query to save booked class data
async function bookClass(req, res) {
    try {
        let requestData = req.body;
        let bookingInfo = BookingInfo.from_json(requestData);

        if (await isClassBooked(bookingInfo) === true) {
            return res.status(StatusCodes.OK).send({
                error: true,
                data: `${bookingInfo.booking_datetime} time slot is unavailable , please select a different slot`,
            });
        }

        await bookSlot(bookingInfo);

        let bookedClass = await saveBookedClass(bookingInfo);
        if (bookedClass !== '') {
            return res.status(StatusCodes.OK).json({ error: false, data: bookedClass });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: true,
                data: "Class Booking Failed , please try again",
            });
        }
    } catch (e) {
        console.log(e)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ error: true, data: "Class Booking Failed , please try again" });
    }
};

module.exports = bookClass;