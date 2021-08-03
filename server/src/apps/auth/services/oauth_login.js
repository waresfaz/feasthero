const { StatusCodes } = require('http-status-codes');
const getAccountFromEmail = require("../../accounts/services/get_account_from_email");
const getOAuthTicket = require('../helpers/get_oauth_ticket');

class OAuthLoginService {
    constructor(token) {
        this.token = token;
    }

    async run() {
        let ticket;
        try {
            ticket = await getOAuthTicket(this.token)
        } catch (e) {
            return { status: StatusCodes.BAD_REQUEST, errorMessage: 'invalid oauth token, please try again' }
        }
        
        const loginData = ticket.getPayload();
        this.account = await getAccountFromEmail(loginData.email);
        if (!this.account)
            return { status: StatusCodes.NOT_FOUND, errorMessage: 'email not found' };

        return { status: StatusCodes.OK, account: this.account };
    }
}

module.exports = OAuthLoginService;