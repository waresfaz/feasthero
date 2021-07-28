const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

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
const verifyApiTkn = require('./middleware/verify_api_tkn');
const authRouter = require("./apps/auth/routes.js");

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
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: settings.MONGO_URI,
    }),
  }));
  app.use(verifyApiTkn);
}


function initRoutes() {
  app.use('/classes', classesRouter);
  app.use('/chefs', chefsRouter);
  app.use('/booking', bookingRouter);
  app.use('/contact', contactRouter);
  app.use('/schedule', scheduleRouter);
  app.use('/subscribe', subscribeRouter);
  app.use('/blog', blogRouter);
  app.use('/auth', authRouter);
}

init();

module.exports = app;