const express = require('express');
const bookingRouter = express.Router();
const bookClass = require('./controllers/book_class');
const getbookingDetailsFromBookingId = require('./controllers/get_booking_details');
const initBookingSession = require('./controllers/init_booking_session');
const wait = require('../../middleware/async');

bookingRouter.post('/book', wait(bookClass));
bookingRouter.post('/init-session', initBookingSession);
bookingRouter.get('/:bookingId', wait(getbookingDetailsFromBookingId))

module.exports = bookingRouter;