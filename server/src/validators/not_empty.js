class NotEmptyValidator {
    static validate(name) {
        if (name === '' || name === null || name === undefined)
            return {valid: false, info: 'cannot be empty' };
        return { valid: true };
    }
}

module.exports = NotEmptyValidator;