class NameValidator {
    static validate(name) {
        if (!name) {
            return { valid: false, info: 'name cannot be empty' };
        } else {
            if (!name.match(/^[a-zA-Z\s]+$/))
                return { valid: false, info: 'only letters in name' };
        }
        return { valid: true };
    }
}

module.exports = NameValidator;