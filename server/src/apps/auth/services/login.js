const { StatusCodes } = require("http-status-codes");
const Bcrypt = require("bcryptjs");
const EmailValidator = require('../../../validators/email');
const PasswordValidator = require('../../../validators/password');
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');


class LoginService {
    constructor(loginData) {
        this.loginData = loginData;
    }

    async run() {
        this.account = await getAccountFromEmail(this.loginData.email);
        if (!this.account)
            return { status: StatusCodes.NOT_FOUND, errorMessage: 'email not found' };

        const validatedLoginData = this.validate();
        if (!validatedLoginData.valid)
            return validatedLoginData

        if (!this._passwordsMatch())
            return { status: StatusCodes.UNAUTHORIZED, errorMessage: 'incorrect password' };

        return { status: StatusCodes.OK, account: this.account };
    }

    validate() {
        if (!EmailValidator.validate(this.loginData.email))
            return { valid: false, status: StatusCodes.BAD_REQUEST, errorMessage: 'invalid email' }
        if (!PasswordValidator.validate(this.loginData.password))
            return { valid: false, status: StatusCodes.BAD_REQUEST, errorMessage: 'invalid password' }

        return { valid: true }
    }


    _passwordsMatch() {
        return Bcrypt.compareSync(this.loginData.password, this.account.password);
    }
}

module.exports = LoginService;