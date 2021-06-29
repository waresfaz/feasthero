const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');

async function save_booked_class(booking_info) {
    let booked_class = new Booking(booking_info);
    return booked_class
        .save()
        .then((booked_class) => { return booked_class._id })
        .catch((_) => { return error_booking_class(booking_info) });
}

/**
 * I do not know what error is thrown or why it updates schedule when 
 * there is an error. Remember to ask why or test it yourself.
 */
async function error_booking_class(booking_info) {
    await Schedule.updateOne(
        {
            class_id: ObjectId(booking_info.class_id),
            $and: [
                {
                    date: { $gte: new Date(booking_info.booking_datetime) },
                },
                {
                    date: {
                        $lt: new Date(
                            moment(booking_info.booking_datetime).add(1, 'hour')
                        ),
                    },
                },
            ],
        },
        { available: true }
    );
    return '';
}

module.exports = save_booked_class;