class NotEmptyValidator {
    static validate(name) {
        if (name === '' || name === null || name === undefined)
            return {valid: false, errorMessage: 'cannot be empty' };
        return { valid: true };
    }
}

module.exports = NotEmptyValidator;