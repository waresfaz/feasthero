const express = require('express');
const classesRouter = express.Router();
const allClasses = require('./controllers/all_classes');
const newClass = require('./controllers/new_class');
const wait = require('../../middleware/async');

classesRouter.get('/all', wait(allClasses));
classesRouter.post('/new', wait(newClass));

module.exports = classesRouter;