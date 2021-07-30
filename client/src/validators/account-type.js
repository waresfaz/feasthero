import { ADMIN, CHEF, CUSTOMER } from "../constants/app-constants";

class AccountTypeValidator {
    static validate(accountType) {
        if (!accountType)
            return 'account type must not be empty';
        if (AccountTypeValidator._accountTypeIsInvalid(accountType))
            return 'invalid account type';

        return null;
    }

    static _accountTypeIsInvalid(accountType) {
        return accountType !== ADMIN && accountType !== CHEF && accountType !== CUSTOMER
    }
}

export default AccountTypeValidator;