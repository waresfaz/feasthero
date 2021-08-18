const express = require('express');
const scheduleRouter = express.Router();
const getClassSchedule = require('./controllers/get_class_schedule');
const addSchedule = require('./controllers/add_schedule');
const wait = require('../../middleware/async');

scheduleRouter.get("/:classId", wait(getClassSchedule));
scheduleRouter.post("/add", wait(addSchedule));

module.exports = scheduleRouter;