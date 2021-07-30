const { StatusCodes } = require("http-status-codes");
const Bcrypt = require("bcryptjs");

const EmailValidator = require('../../../validators/email');
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');


const INVALID_LOGIN = { status: StatusCodes.CONFLICT, response: "invalid login" };

class Login {

    constructor(loginData) {
        super(loginData);
        this.loginData = loginData;
    }

    async run() {
        this.account = await getAccountFromEmail(this.loginData.email);
        if (!this.account)
            return INVALID_LOGIN;

        const isLoginDataValid = this._validateLoginData();
        if (isLoginDataValid.valid === false)
            return isLoginDataValid.info;

        if (!this._passwordsMatch())
            return INVALID_LOGIN;

        return true;
    }

    _validateLoginData() {
        if (!EmailValidator.validate(this.loginData.email))
            return { valid: false, info: 'invalid email' }
        return { valid: true }
    }

    async _passwordsMatch() {
        return Bcrypt.compareSync(this.loginData.password, this.account.password);
    }
}

module.exports = Login;