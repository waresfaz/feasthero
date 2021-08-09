const express = require('express');
const classesRouter = express.Router();
const allClasses = require('./controllers/all_classes');
const newClass = require('./controllers/new_class');
const wait = require('../../middleware/async');
const filterClasses = require('./controllers/filter_classes');
const deleteClass = require('./controllers/delete_class');

classesRouter.get('/all', wait(allClasses));
classesRouter.get('/filter', wait(filterClasses))
classesRouter.post('/new', wait(newClass));
classesRouter.delete('/class/:id', wait(deleteClass))

module.exports = classesRouter;