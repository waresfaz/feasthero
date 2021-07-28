class BooleanValidator {
    static validate(value) {
        if (value !== true && value !== false)
            return { valid: false, info: 'not true or false' }
        return { valid: true };
    }
}

module.exports = BooleanValidator;