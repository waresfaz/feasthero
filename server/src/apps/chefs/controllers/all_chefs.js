const Accounts = require('../../accounts/schema/account');
const { CHEF } = require('../../../constants/app_constants')
const { StatusCodes } = require("http-status-codes");

async function allChefs(_, res) {
    return await Accounts.find({ type: CHEF })
        .then((res) => {
            return res.status(StatusCodes.OK).json({ response: res });
        })
        .catch((_) => {
            return res.status(StatusCodes.BAD_REQUEST).json({ response: [] });
        })

};

module.exports = allChefs;