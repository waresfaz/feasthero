const Booking = require('../schema/booking');
const Schedule = require('../../schedule/schema/schedule');

async function saveBookedClass(bookingInfo) {
    let bookedClass = new Booking(bookingInfo);
    return bookedClass
        .save()
        .then((bookedClass) => { return bookedClass._id })
        .catch((_) => { return errorBookingClass(bookingInfo) });
}

/**
 * I do not know what error is thrown or why it updates schedule when 
 * there is an error. Remember to ask why or test it yourself.
 */
async function errorBookingClass(bookingInfo) {
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
                    },F
                },
            ],
        },
{ available: true }
    );
return '';
}

module.exports = saveBookedClass;