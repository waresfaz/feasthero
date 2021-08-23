const express = require('express');
const classesRouter = express.Router();
const newClass = require('./controllers/new_class');
const wait = require('../../middleware/async');
const deleteClass = require('./controllers/delete_class');
const updateClass = require('./controllers/update_class');
const verifyChefIsAccessingTheirClass = require('../../middleware/verify_chef_is_accessing_their_class');
const validateClassDataMiddleware = require('../../middleware/validate_class_data');
const upload = require('../../middleware/upload_image');
const parseClassData = require('../../middleware/parse_class_data');
const withAuth = require('../../middleware/with_auth');
const chefClasses = require('./controllers/chef_classes');
const verifyUserIsChef = require('../../middleware/verify_user_is_chef');
const findClassFilteredForBooking = require('./controllers/find_class_filtered_for_booking');
const allClassesFilteredForHomePage = require('./controllers/all_classes_filtered_for_home_page');
const addTimeSlot = require('./controllers/add_time_slot');

classesRouter.post('/new', parseClassData, validateClassDataMiddleware, upload.single('thumbnail'), wait(newClass));
classesRouter.delete('/class/:classId', wait(verifyChefIsAccessingTheirClass), wait(deleteClass))
classesRouter.patch('/class/:classId', parseClassData, wait(verifyChefIsAccessingTheirClass), validateClassDataMiddleware, upload.single('thumbnail'), wait(updateClass))
classesRouter.get('/for-booking/all', wait(allClassesFilteredForHomePage));
classesRouter.get('/for-booking/class/:classId', wait(findClassFilteredForBooking));
classesRouter.get('/current-chef/all', withAuth, verifyUserIsChef, wait(chefClasses));
classesRouter.post('/schedule/add/timeslot/:classId', verifyUserIsChef, verifyChefIsAccessingTheirClass, wait(addTimeSlot));

module.exports = classesRouter;