const { StatusCodes } = require('http-status-codes');

function getAccount(req, res) {
    const account = req.session.account;
    if (account)
        return res.status(StatusCodes.OK).json(account);

    return res.status(StatusCodes.UNAUTHORIZED).json('unauthorized');
}

module.exports = getAccount;