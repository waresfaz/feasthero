const express = require('express');
const ordersRouter = express.Router();
const getOrderDetailsFromOrderId = require('./controllers/get_order_details');
const wait = require('../../middleware/async');

ordersRouter.get('/:orderId', wait(getOrderDetailsFromOrderId));

module.exports = ordersRouter
