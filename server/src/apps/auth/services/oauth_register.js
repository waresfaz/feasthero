const { StatusCodes } = require('http-status-codes');
const { CUSTOMER } = require('../../../constants/app_constants');
const Account = require('../../accounts/schema/account');
const attachProfileToAccount = require('../helpers/attach_profile_to_account');
const getOAuthTicket = require('../helpers/get_oauth_ticket');
const ValidateRegistrationData = require('./validate_registration_data');

class OAuthRegistrationService {
    constructor(token) {
        this.token = token;
    }

    async run() {
        try {
            this.ticket = await getOAuthTicket(this.token)
        } catch (e) {
            return { status: StatusCodes.BAD_REQUEST, errorMessage: 'invalid oauth token, please try again' }
        }

        if (await ValidateRegistrationData.accountDoesExist(this.ticket.getPayload().email))
            return { status: StatusCodes.CONFLICT, errorMessage: 'account already exists' };

        const account = await this._saveToDatabase();

        return { status: StatusCodes.OK, account: account };
    }

    async _saveToDatabase() {
        let account = new Account(this._getRegisterData());
        account = attachProfileToAccount(account, CUSTOMER);
        account.save();
        return account;
    }

    _getRegisterData() {
        const ticketPayload = this.ticket.getPayload();
        return {
            firstName: ticketPayload.given_name,
            lastName: ticketPayload.family_name,
            email: ticketPayload.email,
            password: '',
            type: CUSTOMER
        }
    }

}

module.exports = OAuthRegistrationService;