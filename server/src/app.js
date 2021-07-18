const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session')

const { connectToDb } = require('./database/connect.js');
const { settings } = require("./feasthero/settings.js");

const classesRouter = require('./apps/classes/routes');
const chefsRouter = require('./apps/chefs/routes');
const bookingRouter = require('./apps/booking/routes');
const contactRouter = require('./apps/contact/routes');
const scheduleRouter = require('./apps/schedule/routes');
const subscribeRouter = require("./apps/subscribe/routes");
const blogRouter = require('./apps/blog/routes');

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
    name: 'session', // Using a common
    keys: [settings.SESSION_SECRET],
    httpOnly: true,
    secure: !settings.DEBUG, // this might be it 
    maxAge: 900000, // 15 minutes
    signed: true, // Try taking this off. this compramises mobile sometimes
  }))
}

function initRoutes() {
  app.use('/classes', classesRouter);
  app.use('/chefs', chefsRouter);
  app.use('/booking', bookingRouter);
  app.use('/contact', contactRouter);
  app.use('/schedule', scheduleRouter);
  app.use('/subscribe', subscribeRouter);
  app.use('/blog', blogRouter);
}

init();

module.exports = app;