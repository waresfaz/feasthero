class PasswordValidator {
    static validate(password) {
        if (!password)
            return { valid: false, info: 'Enter your password' };
        if (password.length < 8)
            return { valid: false, info: 'Must be longer than 8' };
        if (password.search(/[0-9]/) < 0)
            return { valid: false, info: 'Must contain at least one digit' };
        if (password.search(/[a-z]/i) < 0)
            return { valid: false, info: 'Must contain at least one letter' };

        return { valid: true };
    }

    static passwordsEqual(passOne, passTwo) {
        if (passOne !== passTwo)
            return 'Passwords to not match';
        return true;
    }
}

module.exports = PasswordValidator;