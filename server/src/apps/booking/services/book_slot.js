const Schedule = require('../../schedule/schema/schedule');
const moment = require('moment');
var ObjectId = require("mongoose").Types.ObjectId;

async function book_slot(booking_info) {
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
        { available: false }
    );
}

module.exports = book_slot;