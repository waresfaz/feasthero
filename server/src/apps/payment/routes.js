const express = require('express');
const paymentRouter = express.Router();
const processPayment = require('./controllers/process_payment');
const wait = require('../../middleware/async');

paymentRouter.post('/pay', wait(processPayment));

module.exports = paymentRouter;