const { StatusCodes } = require("http-status-codes");
const OAuthRegistrationService = require("../services/oauth_register");
const putAccountInSession = require('../helpers/put_account_in_session');

async function oAuthRegister(req, res) {
    const { token, accountType } = req.body;

    const oAuthRegistrationService = new OAuthRegistrationService(token, accountType);
    const registrationResult = await oAuthRegistrationService.run();

    if (registrationResult.status === StatusCodes.OK) {
        putAccountInSession(req.session, registrationResult.account);
        res.status(registrationResult.status).json(registrationResult.account);
    }

    res.status(registrationResult.status).json(registrationResult.errorMessage);
}

module.exports = oAuthRegister;