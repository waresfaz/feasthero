const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');

async function saveBookedClass(bookingInfo) {
    let booked_class = new Booking(bookingInfo);
    return booked_class
        .save()
        .then((booked_class) => { return booked_class._id })
        .catch((_) => { return errorBookingClass(bookingInfo) });
}

/**
 * I do not know what error is thrown or why it updates schedule when 
 * there is an error. Remember to ask why or test it yourself.
 */
async function errorBookingClass(bookingInfo) {
    await Schedule.updateOne(
        {
            class_id: ObjectId(bookingInfo.class_id),
            $and: [
                {
                    date: { $gte: bookingInfo.booking_datetime.toDate() },
                },
                {
                    date: {
                        $lt: bookingInfo.booking_datetime.add(1, 'hour').toDate()
                    },F
                },
            ],
        },
{ available: true }
    );
return '';
}

module.exports = saveBookedClass;