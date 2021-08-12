const { StatusCodes } = require('http-status-codes');
const Class = require("../schema/class");
const validateClassData = require('../services/validate_class_data');
const isEmpty = require('../../../helpers/is_empty');

async function updateClass(req, res) {
    const classId = req.params.classId;
    const { classData } = req.body;

    const errors = validateClassData(classData);
    if (!isEmpty(errors))
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });

    return Class.findOneAndUpdate({ '_id': classId }, classData, { useFindAndModify: false }, function (err, _) {
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { error: err } });
        return res.status(StatusCodes.OK).send('ok');
    })
}

module.exports = updateClass;