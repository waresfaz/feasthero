const express = require('express');
const scheduleRouter = express.Router();
const getClassSchedule = require('./controllers/get_class_schedule');
const addSchedule = require('./controllers/add_schedule');
const wait = require('../../middleware/async');
const verifyChefIsAccessingTheirClass = require('../../middleware/verify_chef_is_accessing_their_class');
const verifyUserIsChef = require('../../middleware/verify_user_is_chef');

scheduleRouter.get("/:classId", wait(getClassSchedule));
scheduleRouter.post("/add", verifyUserIsChef, verifyChefIsAccessingTheirClass, wait(addSchedule));

module.exports = scheduleRouter;