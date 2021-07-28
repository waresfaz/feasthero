const StatusCodes = require('http-status-codes');
const Bcrypt = require("bcryptjs");

const EmailValidator = require("../../../validators/email");
const NameValidator = require("../../../validators/name");
const PasswordValidator = require("../../../validators/password");
const Account = require('../../accounts/schema/account');
const Authentication = require("./authentication");
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');


class Registration extends Authentication {
    constructor(registrationData) {
        super(registrationData);
        this.registrationData = registrationData;
    }

    async run() {
        const validatedRegistrationData = this._validateRegistrationData();
        if (validatedRegistrationData.valid === false)
            return { status: StatusCodes.BAD_REQUEST, response: validatedRegistrationData.info };

        if ((await getAccountFromEmail(this.registrationData.email)) > 0)
            return { status: StatusCodes.CONFLICT, response: "account already exists" };

        await this._saveToDatabase();
    }

    _validateRegistrationData() {
        if (!EmailValidator.validate(this.registrationData.email))
            return { valid: false, info: 'invalid email' };
        if (!NameValidator.validate(this.registrationData.firstName))
            return { valid: false, info: 'invalid first name' };
        if (!NameValidator.validate(this.registrationData.lastName))
            return { valid: false, info: 'invalid last name' };
        if (!PasswordValidator.passwordsEqual(this.registrationData.passwordOne, this.registrationData.passwordTwo))
            return { valid: false, info: 'passwords must match' };
        if (!PasswordValidator.validate(this.registrationData.passwordOne))
            return { valid: false, info: 'invalid password' };

        return { valid: true };
    }

    async _saveToDatabase() {
        const hashedPassword = this._getHashedPassword(this.registrationData.passwordOne);
        const finalAccountData = {
            ...this.registrationData,
            password: hashedPassword,
        }
        const accountAsSchema = new Account(finalAccountData)
        await accountAsSchema.save();
    }

    _getHashedPassword(password) {
        return Bcrypt.hashSync(password, 10);
    }
}

module.exports = Registration;