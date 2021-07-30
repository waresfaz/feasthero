const { StatusCodes } = require("http-status-codes");

const AuthenticationFactory = require("../services/authentication_factory");

async function register(req, res) {
    const regData = req.body.regData;
    const register = AuthenticationFactory.getAuthenticationService("REGISTER", regData);
    const result = await register.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.response);
}

function putAccountInSession(session, registerResult) {
    session.account = registerResult.account;
    session.save();
}

module.exports = register;