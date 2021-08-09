const { StatusCodes } = require("http-status-codes");

const ValidateRegistrationData = require('./validate_registration_data');
const { CUSTOMER } = require("../../../constants/app_constants");
const AccountFactory = require("../../accounts/account_factory");

class RegistrationService {
    constructor(registrationData) {
        this.registrationData = registrationData;
    }

    async run() {
        const errors = this._validate();
        if (errors)
            return { status: StatusCodes.BAD_REQUEST, errors: errors };

        if (await ValidateRegistrationData.accountDoesExist(this.registrationData.email))
            return { status: StatusCodes.CONFLICT, errors: { account: "account already exists" } };

        const account = this._createAccount()
        await this._saveToDatabase(account);

        return { status: StatusCodes.OK, account: account };
    }

    _validate() {
        const registrationDataValidator = new ValidateRegistrationData(this.registrationData);
        const errors = registrationDataValidator.validate();
        return errors;
    }

    _createAccount() {
        return AccountFactory.getAccount(CUSTOMER, this.registrationData);
    }

    async _saveToDatabase(account) {
        await account.save()
        return account;
    }
}

module.exports = RegistrationService;