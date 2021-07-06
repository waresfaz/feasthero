const Schedule = require('../../schedule/schema/schedule');
const moment = require('moment');
var ObjectId = require("mongoose").Types.ObjectId;

async function bookSlot(bookingInfo) {
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

module.exports = bookSlot;