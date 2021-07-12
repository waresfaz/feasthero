const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
var cookieSession = require('cookie-session')

const { connectToDb } = require('./database/connect.js');
const { settings } = require("./feasthero/settings.js");

const classesRouter = require('./apps/classes/routes');
const chefsRouter = require('./apps/chefs/routes');
const bookingRouter = require('./apps/booking/routes');
const contactRouter = require('./apps/contact/routes');
const ordersRouter = require('./apps/orders/routes');
const scheduleRouter = require('./apps/schedule/routes');

const errorMiddleware = require('./middleware/error');

function init() {
  connectToDb();
  initMiddleware();
  initRoutes();
}


function initMiddleware() {
  app.use(cors({ origin: settings.CLIENT_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorMiddleware);
  app.use(cookieParser());
  app.use(cookieSession({
    name: 'session',
    keys: [settings.SESSION_SECRET],
    httpOnly: true,
    secure: !settings.DEBUG,
    maxAge: 900000, // 15 minutes
    signed: true,
  }))
}

function initRoutes() {
  app.use('/classes', classesRouter);
  app.use('/chefs', chefsRouter);
  app.use('/booking', bookingRouter);
  app.use('/contact', contactRouter);
  app.use('/orders', ordersRouter);
  app.use('/schedule', scheduleRouter);
}

init();

module.exports = app;