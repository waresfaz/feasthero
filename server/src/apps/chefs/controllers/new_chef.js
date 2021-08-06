const { StatusCodes } = require('http-status-codes');
const { CHEF } = require('../../../constants/app_constants');
const AccountFactory = require('../../accounts/account_factory');

async function newChef(req, res) {
    console.log(req.body)
    const chefAccount = AccountFactory.getAccount(CHEF, req.body)
    return await chefAccount
        .save()
        .then((chefAccountDoc) => {
            return res.status(StatusCodes.OK).send(chefAccountDoc._id);
        })
        .catch((err) => {
            return res.status(StatusCodes.BAD_REQUEST).send(
                "chef data insert Failed , please try again"
            );
        });
};
module.exports = newChef;