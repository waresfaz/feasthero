const express = require('express');
const bookingRouter = express.Router();
const bookClass = require('./controllers/book_class');
const initSession = require('./controllers/init_session');
const getBookingDetailsFromSession = require('./controllers/get_booking_details_from_session');
const verifyBookingSuccess = require('./controllers/verify_booking_success');
const wait = require('../../middleware/async');
const formatSelectedClassDateTime = require('../../middleware/format_selected_class_datetime')
const isBookingDetailsSessionActive = require('../../middleware/is_session_active');
const isSessionActive = require('./controllers/is_session_active');

bookingRouter.post('/book', isBookingDetailsSessionActive, formatSelectedClassDateTime, wait(bookClass));
bookingRouter.post('/init-session', initSession);
bookingRouter.get('/details-from-session', isBookingDetailsSessionActive, getBookingDetailsFromSession);
bookingRouter.get('/verify-success', isBookingDetailsSessionActive, wait(verifyBookingSuccess))
bookingRouter.get('/is-session-active', isSessionActive);

module.exports = bookingRouter;