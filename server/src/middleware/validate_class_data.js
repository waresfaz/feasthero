const { StatusCodes } = require("http-status-codes");
const validateClassData = require("../apps/classes/services/validate_class_data");
const isEmpty = require("../helpers/is_empty");

function validateClassDataMiddleware(req, res, next) {
    const { classData } = res.locals;
    const errors = validateClassData(classData);
    if (!isEmpty(errors))
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });

    next();
}

module.exports = validateClassDataMiddleware;