const Schedule = require('../../schedule/schema/schedule');
const moment = require('moment');
var ObjectId = require("mongoose").Types.ObjectId;

async function is_class_booked(booking_info) {
    let booked_time = await Schedule.findOne({
        class_id: ObjectId(booking_info.class_id),
        $and: [
          {
            date: { $gte: booking_info.booking_datetime.toDate() },
          },
          {
            date: {
              $lte: booking_info.booking_datetime.add(1, "hour").toDate(),
            },
          },
        ],
      });

    return booked_time.avaliable === false;
}

module.exports = is_class_booked;