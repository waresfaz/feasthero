const BookingInfo = require('../models/booking_info')
const is_class_booked = require('../services/is_class_booked');
const StatusCodes = require('http-status-codes');
const book_slot = require('../services/book_slot');
const save_booked_class = require('../services/book_class');

// query to save booked class data
async function book_class(req, res) {
    try {
        let request_data = req.body;
        let booking_info = BookingInfo.from_json(request_data);

        if (await is_class_booked(booking_info) === true) {
            return res.status(StatusCodes.OK).send({
                error: true,
                data: `${booking_info.booking_datetime} time slot is unavailable , please select a different slot`,
            });
        }

        await book_slot(booking_info);

        let booked_class = await save_booked_class(booking_info);
        if (booked_class !== '') {
            return res.status(StatusCodes.OK).json({ error: false, data: booked_class });
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

module.exports = book_class;