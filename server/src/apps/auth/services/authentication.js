const Account = require("../../accounts/schema/account");
const Bcrypt = require("bcryptjs");

class Authentication {
    constructor(authData) {
        this.authData = authData;
    }

    async run();

    /**
     * @access protected
     */
    async _findAccount() {
        const account = await Account.findOne({ email: this.authData.email });
        if (!account)
            return false;
        return account;
    }

    /**
     * @access protected
     */
    _getHashedPassword() {
        return Bcrypt.hashSync(this.authData.password, 10);
    }
}

module.exports = Authentication;