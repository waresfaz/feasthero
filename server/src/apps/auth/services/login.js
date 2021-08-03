const { StatusCodes } = require("http-status-codes");
const Bcrypt = require("bcryptjs");

const EmailValidator = require('../../../validators/email');
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');


class LoginService {
    constructor(loginData) {
        this.loginData = loginData;
    }

    async run() {
        this.account = await getAccountFromEmail(this.loginData.email);
        if (!this.account)
            return { status: StatusCodes.NOT_FOUND, errorMessage: 'email not found' };

        if (!EmailValidator.validate(this.loginData.email))
            return { status: StatusCodes.BAD_REQUEST, errorMessage: 'invalid email' }

        if (!this._passwordsMatch())
            return { status: StatusCodes.UNAUTHORIZED, errorMessage: 'invalid login' };

        return { status: StatusCodes.OK, account: this.account };
    }


    _passwordsMatch() {
        return Bcrypt.compareSync(this.loginData.password, this.account.password);
    }
}

module.exports = LoginService;