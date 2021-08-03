class PasswordValidator {
    static validate(password) {
        if (!password)
            return { valid: false, errorMessage: 'password must not be empty' };

        return { valid: true };
    }

    static passwordsEqual(passOne, passTwo) {
        if (passOne !== passTwo)
            return { valid: false, errorMessage: 'passwords do not match' };
        return { valid: true };
    }
}

module.exports = PasswordValidator;