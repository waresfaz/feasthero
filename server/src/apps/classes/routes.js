const express = require('express');
const classesRouter = express.Router();
const all_classes = require('./controllers/all_classes');
const new_class = require('./controllers/new_class');
const wait = require('../../middleware/async');

classesRouter.get("/all", wait(all_classes));
classesRouter.post("/newclass", wait(new_class));

module.exports = classesRouter;