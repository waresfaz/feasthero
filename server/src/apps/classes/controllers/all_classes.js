const getAllClasses = require('../services/all_classes');
const StatusCodes = require('http-status-codes');

async function allClasses(_, res) {
    let classes = await getAllClasses()
        .then((response) => response)
        .catch((error) => ({ error: error }));
    console.log(classes.error)
    if (classes.error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ response: classes.error });


    return res.status(StatusCodes.OK).json({ response: classes });

};

module.exports = allClasses;