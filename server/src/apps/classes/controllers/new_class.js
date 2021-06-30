const StatusCodes = require('http-status-codes');
const Class = require('../schema/class');

async function newClass(req, res) {
    let clasData = new Class(req.body);
    return clasData
        .save()
        .then((clasData) => {
            return res.status(StatusCodes.OK).json({ error: false, data: clasData._id });
        })
        .catch(async (_) => {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: true,
                data: "Class insert Failed , please try again",
            });
        });
};

module.exports = newClass;