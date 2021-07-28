const StatusCodes = require('http-status-codes');

const EmailValidator = require("../../../validators/email");
const NameValidator = require("../../../validators/name");
const PasswordValidator = require("../../../validators/password");
const Account = require('../../accounts/schema/account');
const Authentication = require("./authentication");


class Registration extends Authentication {
    constructor(registrationData) {
        super(registrationData);
        this.registrationData = registrationData;
    }

    async run() {
        if (!this._validateRegistrationData())
            return { status: StatusCodes.BAD_REQUEST, response: "invalid input" };
        if (super._findAccount(this.registrationData.email))
            return { status: StatusCodes.CONFLICT, response: "account already exists" };
            
        await this._saveToDatabase();
        return true;
    }

    _validateRegistrationData() {
        if (!EmailValidator.validate(this.registrationData.email))
            return false;
        if (!NameValidator.validate(this.registrationData.firstName))
            return false;
        if (!NameValidator.validate(this.registrationData.lastName))
            return false;
        if (!PasswordValidator.passwordsEqual(this.registrationData.passwordOne, this.registrationData.passwordTwo))
            return false;
        if (!PasswordValidator.validate(this.registrationData.passwordOne))
            return false;

        return true;
    }

    async _saveToDatabase() {
        const hashedPassword = super.getHashedPassword();
        const finalAccountData = {
            ...this.registrationData,
            password: hashedPassword,
        }
        const accountAsSchema = new Account(finalAccountData)
        await accountAsSchema.save();
    }
}

module.exports = Registration;