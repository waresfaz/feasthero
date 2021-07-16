function isBookingDetailsSessionActive(req, res, next) {
    if (!req.session.bookingDetails)
        return res.status(408).json({ response: 'session expired' });

    next();
}

module.exports = isBookingDetailsSessionActive;