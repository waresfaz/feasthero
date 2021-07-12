const moment = require("moment");

function genCustomerBookingConfirmedData(class_, order) {
    return {
        firstName: order.customerFirstName,
        chefName: class_.chefs[0].name,
        className: class_.title,
        selectedClassDateTime: order.selectedClassDateTime,
        zoomLink: class_.chefs[0].zoom,
        classDescription: class_.description,
        recipe: class_.recipe.toString(),
    }
}

module.exports = genCustomerBookingConfirmedData;