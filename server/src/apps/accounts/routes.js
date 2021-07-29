const express = require('express');
const accountsRouter = express.Router();;
const wait = require('../../middleware/async');
const getAccount = require('./controllers/get_account');

accountsRouter.get('/get-account', getAccount);

module.exports = accountsRouter;