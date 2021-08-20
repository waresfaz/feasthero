const express = require('express');
const scheduleRouter = express.Router();
const getClassSchedule = require('./controllers/get_class_schedule');
const wait = require('../../middleware/async');
const verifyChefIsAccessingTheirClass = require('../../middleware/verify_chef_is_accessing_their_class');
const verifyUserIsChef = require('../../middleware/verify_user_is_chef');
const addTimeSlot = require('./controllers/add_time_slot');
const deleteTimeSlot = require('./controllers/delete_time_slot');

scheduleRouter.get('/:classId', wait(getClassSchedule));
scheduleRouter.post('/add', verifyUserIsChef, verifyChefIsAccessingTheirClass, wait(addTimeSlot));
scheduleRouter.delete('/:slotId', verifyUserIsChef, verifyChefIsAccessingTheirClass, wait(deleteTimeSlot));

module.exports = scheduleRouter;