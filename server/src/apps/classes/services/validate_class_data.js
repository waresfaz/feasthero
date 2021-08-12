const cleanErrors = require('../../../helpers/clean_errors');
const NumberValidator = require('../../../validators/number')
const BooleanValidator = require('../../../validators/boolean')

function validateClassData(classData) {
    let errors = {};

    errors['cost'] = NumberValidator.validate(classData.cost);
    errors['mealKitCost'] = NumberValidator.validate(classData.mealKitCost);
    errors['hasMealKit'] = BooleanValidator.validate(classData.hasMealKit);

    return cleanErrors(errors);
}

module.exports = validateClassData;