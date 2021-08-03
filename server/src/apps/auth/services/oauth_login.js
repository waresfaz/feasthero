const getAccountFromEmail = require("../../accounts/services/get_account_from_email");
const { StatusCodes } = require('http-status-codes');

class OAuthLoginService {
    constructor(loginData) {
        this.loginData = loginData;
    }

    async run() {
        this.account = await getAccountFromEmail(this.loginData.email);
        if (!this.account)
            return { status: StatusCodes.NOT_FOUND, errorMessage: 'email not found' };

        return { status: StatusCodes.OK, account: this.account };
    }
}

module.exports = OAuthLoginService;