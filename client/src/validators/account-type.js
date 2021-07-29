import { ADMIN, CHEF, CUSTOMER } from "../constants/app-constants";

class AccountTypeValidator {
    static validate(accountType) {
        if (!accountType)
            return 'account type must not be empty';
        if (accountType !== ADMIN && accountType !== CHEF && accountType !== CUSTOMER)
            return 'invalid account type';

        return null;
    }
}

export default AccountTypeValidator;