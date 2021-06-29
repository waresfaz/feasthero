const moment = require("moment");

function genReminderToChefData(booking, chef, class_) {
    return {
        chef_name: chef.name,
        class_name: class_.title,
        date: moment
            .utc(booking.booking_datetime)
            .tz("US/Eastern")
            .format("dddd, MMMM D,YYYY"),
        time: moment
            .utc(reminder_list[data].booking_datetime)
            .tz("US/Eastern")
            .format("hh:mm a"),
        zoom_link: booking.zoom_link,
    }
}

module.exports = genReminderToChefData;