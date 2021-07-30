const RegistrationService = require('../services/register');
const { StatusCodes } = require("http-status-codes");


async function register(req, res) {
    const regData = req.body.regData;
    const register = new RegistrationService(regData);
    const result = await register.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.errorMessage);
}

function putAccountInSession(session, registerResult) {
    session.account = registerResult.account;
    session.save();
}

module.exports = register;