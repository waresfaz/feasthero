function isSessionActive(req, res) {
    if (!req.session.bookingDetails)
        return res.status(408).json({ response: 'session expired' });

    return res.status(200).json({ response: 'ok' });
}

module.exports = isSessionActive;