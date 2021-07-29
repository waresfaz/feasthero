class BooleanValidator {
    static validate(value) {
        if (value !== true && value !== false)
            return { valid: false, errorMessage: 'not true or false' }
        return { valid: true };
    }
}

module.exports = BooleanValidator;