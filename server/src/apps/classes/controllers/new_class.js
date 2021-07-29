const { StatusCodes } = require("http-status-codes");
const Class = require('../schema/class');

async function newClass(req, res) {
    let clasData = new Class(req.body);
    return clasData
        .save()
        .then((clasData) => {
            return res.status(StatusCodes.OK).json({ response: clasData._id });
        })
        .catch(async (_) => {
            return res.status(StatusCodes.BAD_REQUEST).send({
                response: "Class insert Failed , please try again",
            });
        });
};

module.exports = newClass;