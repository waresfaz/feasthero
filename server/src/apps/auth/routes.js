const express = require('express');
const authRouter = express.Router();;
const wait = require('../../middleware/async');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const oAuthRegister = require('./controllers/oauth_register');
const register = require('./controllers/register');

authRouter.post('/login', wait(login));
authRouter.post('/register', wait(register));
authRouter.post('/oauth/register', wait(oAuthRegister));
authRouter.get('/logout', logout);

module.exports = authRouter;