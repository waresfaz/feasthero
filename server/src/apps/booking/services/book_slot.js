const Schedule = require('../../schedule/schema/schedule');
const moment = require('moment');
var ObjectId = require("mongoose").Types.ObjectId;

async function bookSlot(bookingInfo) {
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
                    },
                },
            ],
        },
        { available: false }
    );
}

module.exports = bookSlot;