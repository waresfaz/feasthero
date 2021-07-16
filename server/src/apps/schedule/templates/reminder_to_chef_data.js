const moment = require("moment");

function genReminderToChefData(booking, chef, class_) {
    return {
        chefName: chef.name,
        className: class_.title,
        date: moment
            .utc(booking.bookingDateTime)
            .tz("US/Eastern")
            .format("dddd, MMMM D,YYYY"),
        time: moment
            .utc(booking.bookingDateTime)
            .tz("US/Eastern")
            .format("hh:mm a"),
        zoomLink: booking.zoomLink,
    }
}

module.exports = genReminderToChefData;