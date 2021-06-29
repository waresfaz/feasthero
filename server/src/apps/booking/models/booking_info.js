const moment = require('moment');
require("moment-timezone");

class BookingInfo {
    constructor(
        class_id, customer_email, customer_first_name,
        customer_last_name, company_size, zoom_link,
        chef_email, has_mealkit, booking_datetime, cost, chef_id,
        booking_status
    ) {
        this.class_id = class_id;
        this.customer_email = customer_email;
        this.customer_first_name = customer_first_name;
        this.customer_last_name = customer_last_name;
        this.company_size = company_size;
        this.zoom_link = zoom_link;
        this.chef_email = chef_email;
        this.has_mealkit = has_mealkit;
        this.booking_datetime = booking_datetime;
        this.cost = cost;
        this.chef_id = chef_id;
        this.booking_status = booking_status;
    }

    static from_json(json) {
        return new BookingInfo(
            json.class_id,
            json.customer_email,
            json.customer_first_name,
            json.customer_last_name,
            json.company_size,
            json.zoom_link,
            json.chef_email,
            json.has_mealkit,
            moment
                .tz(
                    json.booking_datetime,
                    "dddd, MMMM D,YYYY,hh:mm a",
                    "US/Eastern"
                )
                .utc(),
            json.cost,
            json.chef_id,
            json.booking_status
        );
    }
}

module.exports = BookingInfo;