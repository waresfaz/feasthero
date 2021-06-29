const express = require("express");
const cors = require("cors");
const app = express();
const { connectToDb } = require('./database/connect.js');

const classesRouter = require('./apps/classes/routes');
const chefsRouter = require('./apps/chefs/routes');
const bookingRouter = require('./apps/booking/routes');
const contactRouter = require('./apps/contact/routes');
const ordersRouter = require('./apps/orders/routes');
const paymentRouter = require('./apps/payment/routes')
const scheduleRouter = require('./apps/schedule/routes');

function init() {
  connectToDb();
  initMiddleware();
  initRoutes();
}


function initMiddleware() {
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

function initRoutes() {
  app.use('/classes', classesRouter);
  app.use('/chefs', chefsRouter);
  app.use('/booking', bookingRouter);
  app.use('/contact', contactRouter);
  app.use('/orders', ordersRouter);
  app.use('/payments', paymentRouter);
  app.use('/schedule', scheduleRouter);
}

init();

module.exports = app;