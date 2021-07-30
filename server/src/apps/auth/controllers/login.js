const Login = require('../services/login');
const { StatusCodes } = require('http-status-codes');

async function login(req, res) {
    const loginData = req.body.loginData;
    const login = new Login(loginData);
    const result = await login.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.errorMessage);
}

function putAccountInSession(session, loginResult) {
    session.account = loginResult.account;
    session.save();
}


module.exports = login;