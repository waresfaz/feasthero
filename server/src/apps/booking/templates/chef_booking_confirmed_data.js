const moment = require("moment");

function gen_chef_booking_confirmed_data(class_, order) {
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

module.exports = gen_chef_booking_confirmed_data;