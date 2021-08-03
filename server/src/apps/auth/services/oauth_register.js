const { OAuth2Client } = require('google-auth-library');
const { StatusCodes } = require('http-status-codes');
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
const Account = require('../../accounts/schema/account');
const attachProfileToAccount = require('../helpers/attach_profile_to_account');
const ValidateRegistrationData = require('./validate_registration_data');

class OAuthRegistrationService {
    constructor(token, accountType) {
        this.token = token;
        this.accountType = accountType;
    }

    async run() {
        this.ticket = await this._generateTicket();
        if (await ValidateRegistrationData.accountDoesExist(this.ticket.getPayload().email))
            return { status: StatusCodes.CONFLICT, errorMessage: 'account already exists' };
        
        const account = await this._saveToDatabase();

        return { status: StatusCodes.OK, account: account };
    }

    async _generateTicket() {
        return await client.verifyIdToken({
            idToken: this.token,
            audience: process.env.OAUTH_CLIENT_ID,
        });
    }

    async _saveToDatabase() {
        let account = new Account(this._getRegisterData());
        account = attachProfileToAccount(account, this.accountType);
        account.save();
        return account;
    }

    _getRegisterData() {
        const ticketPayload = this.ticket.getPayload();
        return {
            firstName: ticketPayload.given_name,
            lastName: ticketPayload.family_name,
            email: ticketPayload.email,
            type: this.accountType,
            password: '',
        }
    }

}

module.exports = OAuthRegistrationService;