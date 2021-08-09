function isBookingDetailsSessionActive(req, res, next) {
    if (!req.session.bookingDetails)
        return res.status(408).json('booking session not active');

    next();
}

module.exports = isBookingDetailsSessionActive;