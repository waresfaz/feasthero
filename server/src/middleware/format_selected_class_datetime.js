const dateTimeToMoment = require('../helpers/date_time_to_moment');

function formatSelectedClassDateTime(req, res, next) {
    let bookingDetails = req.session.bookingDetails;
    bookingDetails.selectedClassDateTime = new Date(dateTimeToMoment(new Date(bookingDetails.selectedClassDateTime)));
    req.session.save();
    next();
}

module.exports = formatSelectedClassDateTime;