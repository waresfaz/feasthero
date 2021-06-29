const express = require('express');
const classesRouter = express.Router();
const getClasses = require('./controllers/get_classes');
const setClass = require('./controllers/get_classes');
const wait = require('../../middleware/async');

classesRouter.get("/all", wait(getClasses));
classesRouter.post("/class", wait(setClass));

module.exports = classesRouter;