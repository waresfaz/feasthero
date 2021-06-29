const express = require('express');
const ordersRouter = express.Router();
const getOrderDetailsFromOrderId = require('./controllers/get_order_details');
const wait = require('../../middleware/async');

ordersRouter.get('/:order_id', wait(getOrderDetailsFromOrderId));

module.exports = ordersRouter
