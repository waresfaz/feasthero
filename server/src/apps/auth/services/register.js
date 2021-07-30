const { StatusCodes } = require("http-status-codes");
const Bcrypt = require("bcryptjs");

const ValidateRegistrationData = require('./validate_registration_data');
const Account = require('../../accounts/schema/account');
const ProfileFactory = require('../../profiles/profile_factory');

class Registration {
    constructor(registrationData) {
        this.registrationData = registrationData;
    }

    async run() {
        const validatedRegistrationData = await this._validate();
        if (!validatedRegistrationData.valid)
            return { status: StatusCodes.BAD_REQUEST, errorMessage: validatedRegistrationData.errorMessage };

        if (await ValidateRegistrationData.accountDoesExist(this.registrationData.email))
            return { status: StatusCodes.CONFLICT, errorMessage: "account already exists" };

        const account = await this._saveToDatabase();

        return { status: StatusCodes.OK, account: account };
    }

    _validate() {
        const registrationDataValidator = new ValidateRegistrationData(this.registrationData);
        const validatedRegistrationData = registrationDataValidator.validate();
        return validatedRegistrationData;
    }

    async _saveToDatabase() {
        const hashedPassword = this._getHashedPassword(this.registrationData.passwordOne);
        const finalAccountData = {
            ...this.registrationData,
            password: hashedPassword,
        }
        const account = new Account(finalAccountData)
        return await this.attachProfileToAccountAndSave(account)
    }

    _getHashedPassword(password) {
        return Bcrypt.hashSync(password, 10);
    }

    async attachProfileToAccountAndSave(account) {
        const accountProfile = ProfileFactory.getProfile(this.registrationData.accountType);
        account.profile = accountProfile;
        await account.save();
        return account;
    }
}

module.exports = Registration;