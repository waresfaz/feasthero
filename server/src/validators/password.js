class PasswordValidator {
    static validate(password) {
        if (!password)
            return { valid: false, errorMessage: 'password must not be empty' };
        if (password.length < 8)
            return { valid: false, errorMessage: 'password must be longer than 8' };
        if (password.search(/[0-9]/) < 0)
            return { valid: false, errorMessage: 'password must contain at least one digit' };
        if (password.search(/[a-z]/i) < 0)
            return { valid: false, errorMessage: 'password must contain at least one letter' };

        return { valid: true };
    }

    static passwordsEqual(passOne, passTwo) {
        if (passOne !== passTwo)
            return { valid: false, errorMessage: 'passwords do not match' };
        return { valid: true };
    }
}

module.exports = PasswordValidator;