const OAuthLoginService = require('../services/oauth_login');
const { StatusCodes } = require('http-status-codes');
const putAccountInSession = require('../helpers/put_account_in_session');
const getOAuthTicket = require('../helpers/get_oauth_ticket');

async function oAuthLogin(req, res) {
    const { token } = req.body;
    const ticket = await getOAuthTicket(token);
    const login = new OAuthLoginService(ticket.getPayload())
    const result = await login.run();

    if (result.status === StatusCodes.OK) {
        putAccountInSession(req.session, result);
        return res.status(result.status).json(result.account);
    }

    return res.status(result.status).json(result.errorMessage);
}

module.exports = oAuthLogin;