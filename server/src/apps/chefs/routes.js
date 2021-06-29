const express = require('express');
const chefsRouter = express.Router();
const allChefs = require('./controllers/get_chef');
const newChef = require('./controllers/new_chef');
const wait = require('../../middleware/async');

chefsRouter.get("/all", wait(allChefs));
chefsRouter.post("/new", wait(newChef));

module.exports = chefsRouter;