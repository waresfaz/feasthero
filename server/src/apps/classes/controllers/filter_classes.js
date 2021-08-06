const { StatusCodes } = require("http-status-codes");
const Class = require("../schema/class");

async function filterClasses(req, res) {
    const { filter, value } = req.query;

    let classes = await Class.find({ [filter]: value })
        .then((response) => response)
        .catch((error) => ({ error: error }));

    if (classes.error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(classes.error);

    return res.status(StatusCodes.OK).json(classes);

};

module.exports = filterClasses;