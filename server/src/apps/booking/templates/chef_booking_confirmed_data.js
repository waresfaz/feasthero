const moment = require("moment");

function genChefBookingConfirmedData(class_, order) {
    return {
        chef_name: class_.chefs[0].name,
        class_name: class_.title,
        booking_date: moment
            .utc(order.booking_datetime)
            .tz("US/Eastern")
            .format("dddd, MMMM D,YYYY"),
        booking_time: moment
            .utc(order.booking_datetime)
            .tz("US/Eastern")
            .format("hh:mm a"),
    }
}

module.exports = genChefBookingConfirmedData;