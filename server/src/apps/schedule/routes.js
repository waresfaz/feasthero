const express = require('express');
const scheduleRouter = express.Router();
const getSchedule = require('./controllers/get_schedule');
const addSchedule = require('./controllers/add_schedule');
const wait = require('../../middleware/async');

scheduleRouter.get("/:class_id", wait(getSchedule));
scheduleRouter.post("/addtimeslot", wait(addSchedule));

module.exports = scheduleRouter;