const express = require('express');
const chefsRouter = express.Router();
const allChefs = require('./controllers/all_chefs');
const newChef = require('./controllers/new_chef');
const wait = require('../../middleware/async');

chefsRouter.get('/classes/:chefId', wait(allChefs));
chefsRouter.get('/all', wait(allChefs));
chefsRouter.post('/new', wait(newChef));

module.exports = chefsRouter;