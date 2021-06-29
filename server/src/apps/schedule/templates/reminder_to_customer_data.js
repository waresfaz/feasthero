const moment = require("moment");

/**
 * @description object to be parsed into reminder to customer html template
 * @param {Booking} booking - customers booking
 * @param {Chef} chef - booked chef
 * @param {Class} class_ - booked class
 * @returns Object
 */
function genReminderToCustomerData(booking, chef, class_) {
    return {
        customer_first_name: booking.customer_first_name,
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
        description: booking.description,
        recipe: class_.recipe.toString()
    }
}

module.exports = genReminderToCustomerData;