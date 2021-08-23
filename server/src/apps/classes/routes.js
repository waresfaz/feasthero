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
const allClasses = require('./controllers/all_classes_filtered_for_booking');

classesRouter.post('/new', parseClassData, validateClassDataMiddleware, upload.single('thumbnail'), wait(newClass));
classesRouter.delete('/class/:classId', wait(verifyChefIsAccessingTheirClass), wait(deleteClass))
classesRouter.patch('/class/:classId', parseClassData, wait(verifyChefIsAccessingTheirClass), validateClassDataMiddleware, upload.single('thumbnail'), wait(updateClass))
classesRouter.get('/for-booking/all', wait(allClasses));
classesRouter.get('/current-chef/all', withAuth, verifyUserIsChef, wait(chefClasses));

module.exports = classesRouter;