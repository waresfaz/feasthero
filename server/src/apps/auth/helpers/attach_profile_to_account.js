const ProfileFactory = require('../../profiles/profile_factory');

function attachProfileToAccountAndSave(account, accountType) {
    const accountProfile = ProfileFactory.getProfile(accountType);
    account.profile = accountProfile;
    return account;
}

module.exports = attachProfileToAccountAndSave;