const AccountTypeValidator = require("../../../validators/account_type");
const EmailValidator = require("../../../validators/email");
const NameValidator = require("../../../validators/name");
const PasswordValidator = require("../../../validators/password");
const getAccountFromEmail = require('../../accounts/services/get_account_from_email');

class ValidateRegistrationData {
    constructor(registrationData) {
        this.registrationData = registrationData;
    }

    async validate() {
        const validations = [
            this.email(), this.firstName(), this.lastName(),
            this.password(), this.accountType()
        ]

        for (let i = 0; i < validations.length; i++) {
            const validation = validations[i];
            if (!validation.valid)
                return validation;
        }

        return { valid: true };
    }

    email() {
        return EmailValidator.validate(this.registrationData.email);
    }

    firstName() {
        return NameValidator.validate(this.registrationData.firstName);
    }

    lastName() {
        return NameValidator.validate(this.registrationData.lastName);
    }

    password() {
        const passwordsMatch = PasswordValidator.passwordsEqual(this.registrationData.passwordOne, this.registrationData.passwordTwo);
        if (passwordsMatch === true)
            return PasswordValidator.validate(this.registrationData.passwordOne)

        return passwordsMatch;
    }

    accountType() {
        return AccountTypeValidator.validate(this.registrationData.accountType);
    }

    static async accountDoesExist(email) {
        return (await getAccountFromEmail(email)).length > 0 ? true : false;
    }

}

module.exports = ValidateRegistrationData;