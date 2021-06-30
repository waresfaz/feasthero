const Schedule = require('../../schedule/schema/schedule');
const moment = require('moment');
var ObjectId = require("mongoose").Types.ObjectId;

async function isClassBooked(bookingInfo) {
    let bookedTime = await Schedule.findOne({
        class_id: ObjectId(bookingInfo.class_id),
        $and: [
          {
            date: { $gte: bookingInfo.booking_datetime.toDate() },
          },
          {
            date: {
              $lte: bookingInfo.booking_datetime.add(1, "hour").toDate(),
            },
          },
        ],
      });

    return bookedTime.avaliable === false;
}

module.exports = isClassBooked;