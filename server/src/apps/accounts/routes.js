const express = require('express');
const accountsRouter = express.Router();;
const wait = require('../../middleware/async');
const withAuth = require('../../middleware/with_auth');
const getAccount = require('./controllers/get_account');

accountsRouter.get('/get-account', withAuth, getAccount);

module.exports = accountsRouter;