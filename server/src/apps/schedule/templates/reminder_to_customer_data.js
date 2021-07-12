const moment = require("moment");

function genReminderToCustomerData(booking, chef, class_) {
    return {
        customerFirstName: booking.customerFirstName,
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
        description: booking.description,
        recipe: class_.recipe.toString()
    }
}

module.exports = genReminderToCustomerData;