const moment = require("moment");

function genChefBookingConfirmedData(class_, order) {
    return {
        chefName: class_.chefs[0].name,
        className: class_.title,
        bookingDate: moment
            .utc(order.bookingDateTime)
            .tz("US/Eastern")
            .format("dddd, MMMM D,YYYY"),
        bookingTime: moment
            .utc(order.bookingDateTime)
            .tz("US/Eastern")
            .format("hh:mm a"),
    }
}

module.exports = genChefBookingConfirmedData;