const express = require('express');
const bookingRouter = express.Router();
const book_class = require('./controllers/book_class');
const wait = require('../../middleware/async');

bookingRouter.post("/book", wait(book_class));

module.exports = bookingRouter;