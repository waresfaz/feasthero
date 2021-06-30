const moment = require("moment");

function genCustomerBookingConfirmedData(class_, order) {
    return {
        first_name: order.customer_first_name,
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
        zoom_link: order.zoom_link,
        class_description: class_.description,
        recipe: class_.recipe.toString(),
    }
}

module.exports = genCustomerBookingConfirmedData;