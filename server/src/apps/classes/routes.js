const express = require('express');
const classesRouter = express.Router();
const allClasses = require('./controllers/all_classes');
const newClass = require('./controllers/new_class');
const findClass = require('./controllers/find_class');
const wait = require('../../middleware/async');

classesRouter.get('/all', wait(allClasses));
classesRouter.post('/new', wait(newClass));
classesRouter.get('/find/:id', wait(findClass));

module.exports = classesRouter;