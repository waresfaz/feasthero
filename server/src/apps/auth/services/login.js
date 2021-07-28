const StatusCodes = require('http-status-codes');
const Bcrypt = require("bcryptjs");

const Authentication = require("./authentication");

class Login extends Authentication {
    _invalidLogin = { status: StatusCodes.CONFLICT, response: "invalid login" };

    constructor(loginData) {
        super(loginData);
        this.loginData = loginData;
    }

    async run() {
        this.account = await super._findAccount();
        if (!this.account)
            return this._invalidLogin;
        if (!this._passwordsMatch())
            return this._invalidLogin;

        return true;
    }

    async _passwordsMatch() {
        return Bcrypt.compareSync(this.loginData.password, this.account.password);
    }
}

module.exports = Login;