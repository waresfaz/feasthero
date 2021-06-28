const express = require('express');
const bookingRouter = express.Router();
const bookClass = require('./controllers/book_class');
const wait = require('../../middleware/async');

bookingRouter.post("/booking", wait(bookClass));

module.exports = bookingRouter;