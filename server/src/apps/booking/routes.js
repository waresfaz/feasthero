const express = require('express');
const bookingRouter = express.Router();
const bookClass = require('./controllers/book_class');
const initBookingSession = require('./controllers/init_booking_session');
const getBookingDetailsFromSession = require('./controllers/get_booking_details_from_session');
const verifyBookingSuccess = require('./controllers/verify_booking_success');
const wait = require('../../middleware/async');

bookingRouter.post('/book', wait(bookClass));
bookingRouter.post('/init-session', initBookingSession);
bookingRouter.get('/details-from-session', getBookingDetailsFromSession);
bookingRouter.get('/verify-success', wait(verifyBookingSuccess))

module.exports = bookingRouter;