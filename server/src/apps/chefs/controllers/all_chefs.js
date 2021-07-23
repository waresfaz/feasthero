const Chef = require('../schema/chef');
const StatusCodes = require('http-status-codes');

async function allChefs(_, res) {
    return await Chef.find({})
        .then((res) => {
            return res.status(StatusCodes.OK).json({ response: chef });
        })
        .catch((_) => {
            return res.status(StatusCodes.BAD_REQUEST).json({ response: [] });
        })

};

module.exports = allChefs;