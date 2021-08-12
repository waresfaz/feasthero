const express = require('express');
const classesRouter = express.Router();
const allClasses = require('./controllers/all_classes');
const newClass = require('./controllers/new_class');
const wait = require('../../middleware/async');
const filterClasses = require('./controllers/filter_classes');
const deleteClass = require('./controllers/delete_class');
const updateClass = require('./controllers/update_class');
const verifyChefIsAccessingTheirClass = require('../../middleware/verify_chef_is_accessing_their_class');
const validateClassDataMiddleware = require('../../middleware/validate_class_data');

classesRouter.get('/all', wait(allClasses));
classesRouter.get('/filter', wait(filterClasses))
classesRouter.post('/new', wait(newClass));
classesRouter.delete('/class/:classId', wait(verifyChefIsAccessingTheirClass), wait(deleteClass))
classesRouter.patch('/class/:classId', wait(verifyChefIsAccessingTheirClass), validateClassDataMiddleware, wait(updateClass))

module.exports = classesRouter;