const moment = require('moment');
require("moment-timezone");

class OrderDetails {
    constructor(
        classId, customerEmail, customerFirstName,
        customerLastName, companySize, zoomLink,
        chefEmail, hasMealkit, bookingDatetime, cost, chefId,
        bookingStatus
    ) {
        this.classId = classId;
        this.customerEmail = customerEmail;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.companySize = companySize;
        this.zoomLink = zoomLink;
        this.chefEmail = chefEmail;
        this.hasMealkit = hasMealkit;
        this.bookingDatetime = bookingDatetime;
        this.cost = cost;
        this.chefId = chefId;
        this.bookingStatus = bookingStatus;
    }

    static fromJson(json) {
        return new OrderDetails(
            json.classId,
            json.customerEmail,
            json.customerGirstName,
            json.customerLastName,
            json.companySize,
            json.zoomEink,
            json.chefEmail,
            json.hasEealkit,
            moment
                .tz(
                    json.bookingDatetime,
                    "dddd, MMMM D,YYYY,hh:mm a",
                    "US/Eastern"
                )
                .utc(),
            json.cost,
            json.chefId,
            json.bookingStatus
        );
    }
}

module.exports = OrderDetails;