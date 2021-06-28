const express = require("express");
const cors = require("cors");
const app = express();
const { connectToDb } = require('./database/connect.js');
const classesRouter = require('./apps/classes/routes');
const chefsRouter = require('./apps/chefs/routes');

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
}

init();

module.exports = app;