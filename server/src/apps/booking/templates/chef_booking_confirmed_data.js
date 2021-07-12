const moment = require("moment");

function genChefBookingConfirmedData(class_, order) {
    return {
        chefName: class_.chefs[0].name,
        className: class_.title,
        selectedClassDateTime: order.selectedClassDateTime,
    }
}

module.exports = genChefBookingConfirmedData;