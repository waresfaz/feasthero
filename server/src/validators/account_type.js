const { ADMIN, CHEF, CUSTOMER } = require('../constants/app_constants');

class AccountTypeValidator {
    static validate(accountType) {
        if (!accountType)
            return { valid: false, errorMessage: 'account type must not be empty' };
        if (AccountTypeValidator._accountTypeIsInvalid(accountType))
            return { valid: false, errorMessage: 'invalid account type' };

        return { valid: true };
    }

    static _accountTypeIsInvalid(accountType) {
        return accountType !== ADMIN && accountType !== CHEF && accountType !== CUSTOMER
    }
}

module.exports = AccountTypeValidator;