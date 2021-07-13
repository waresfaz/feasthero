const express = require('express');
const bookingRouter = express.Router();
const bookClass = require('./controllers/book_class');
const initBookingSession = require('./controllers/init_booking_session');
const getBookingDetailsFromSession = require('./controllers/get_booking_details_from_session');
const verifyBookingSuccess = require('./controllers/verify_booking_success');
const wait = require('../../middleware/async');
const formatSelectedClassDateTime = require('../../middleware/format_selected_class_datetime')
const isBookingDetailsSessionActive = require('../../middleware/is_session_active');

bookingRouter.post('/book', isBookingDetailsSessionActive, formatSelectedClassDateTime, wait(bookClass));
bookingRouter.post('/init-session', initBookingSession);
bookingRouter.get('/details-from-session', isBookingDetailsSessionActive, getBookingDetailsFromSession);
bookingRouter.get('/verify-success', isBookingDetailsSessionActive, wait(verifyBookingSuccess))

module.exports = bookingRouter;