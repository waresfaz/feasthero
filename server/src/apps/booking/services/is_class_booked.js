const Schedule = require('../../schedule/schema/schedule');
const moment = require('moment');
var ObjectId = require("mongoose").Types.ObjectId;

async function isClassBooked(bookingInfo) {
    let bookedTime = await Schedule.findOne({
        classId: ObjectId(bookingInfo.classId),
        $and: [
          {
            date: { $gte: bookingInfo.bookingDateTime.toDate() },
          },
          {
            date: {
              $lte: bookingInfo.bookingDateTime.add(1, "hour").toDate(),
            },
          },
        ],
      });

    return bookedTime.avaliable === false;
}

module.exports = isClassBooked;