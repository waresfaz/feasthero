const express = require('express');
const authRouter = express.Router();;
const wait = require('../../middleware/async');
const login = require('./controllers/login');
const register = require('./controllers/register');

authRouter.post('/login', wait(login));
authRouter.post('/register', wait(register));

module.exports = authRouter;