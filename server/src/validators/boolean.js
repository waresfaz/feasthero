class BooleanValidator {
    static validate(value) {
        if (BooleanValidator._isNotABoolean(value))
            return { valid: false, errorMessage: 'not true or false' }
        return { valid: true };
    }

    static _isNotABoolean(value) {
        return value !== true && value !== false
    }
}

module.exports = BooleanValidator;