const moment = require("moment");

function genCustomerBookingConfirmedData(classData, orderDetails) {
    return {
        firstName: orderDetails.customerFirstName,
        chefName: classData.chefs[0].name,
        className: classData.title,
        selectedClassDateTime: orderDetails.selectedClassDateTime,
        zoomLink: classData.chefs[0].zoom,
        classDescription: classData.description,
        recipe: classData.recipe,
    }
}

module.exports = genCustomerBookingConfirmedData;