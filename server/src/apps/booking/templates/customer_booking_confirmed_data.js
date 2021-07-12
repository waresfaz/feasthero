const moment = require("moment");

function genCustomerBookingConfirmedData(class_, order) {
    return {
        firstName: order.customerFirstName,
        chefName: class_.chefs[0].name,
        className: class_.title,
        bookingDate: moment
            .utc(order.bookingDateTime)
            .tz("US/Eastern")
            .format("dddd, MMMM D,YYYY"),
        bookingYime: moment
            .utc(order.bookingDateTime)
            .tz("US/Eastern")
            .format("hh:mm a"),
        zoomLink: class_.chefs[0].zoom,
        classDescription: class_.description,
        recipe: class_.recipe.toString(),
    }
}

module.exports = genCustomerBookingConfirmedData;