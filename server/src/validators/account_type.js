const { ADMIN, CHEF, CUSTOMER } = require('../constants/app_constants');

class AccountTypeValidator {
    static validate(accountType) {
        if (!accountType)
            return { valid: false, errorMessage: 'account type must not be empty' };
        if (accountType !== ADMIN && accountType !== CHEF && accountType !== CUSTOMER)
            return { valid: false, errorMessage: 'invalid account type' };

        return { valid: true };
    }
}

module.exports = AccountTypeValidator;