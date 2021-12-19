const { CHEF, CUSTOMER } = require("../../constants/app_constants");
const ProfileFactory = require("../profiles/profile_factory");
const Account = require("./schema/account");

class AccountFactory {
    static getAccount(type, data) {
        switch (type) {
            case CHEF:
                let chefAccount = new Account(data);
                chefAccount.set({ type: CHEF })
                chefAccount.set({ profile: ProfileFactory.getProfile(CHEF, data) });
                return chefAccount;
            case CUSTOMER:
                let customerAccount = new Account(data);
                customerAccount.set({ type: CUSTOMER })
                customerAccount.set({ profile: ProfileFactory.getProfile(CUSTOMER, data) });
                return customerAccount;
        }
    }
}

module.exports = AccountFactory;