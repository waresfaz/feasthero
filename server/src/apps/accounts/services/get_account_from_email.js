const Account = require("../../accounts/schema/account");

async function getAccountFromEmail(email) {
    return await Account.find({ email: email });
}

module.exports = getAccountFromEmail;