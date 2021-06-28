const express = require('express');
const ordersRouter = express.Router();
const getOrderDetails = require('./controllers/get_order_details');
const wait = require('../../middleware/async');

ordersRouter.get('/order/:order_id', wait(controllers.getOrderDetails));

module.exports = ordersRouter
