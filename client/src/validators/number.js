class NumberValidator {
    static validate(value) {
        if (typeof value !== Number)
            return null;
        if (isNaN(value))
            return 'not a number';
        return null;
    }
}

export default NumberValidator;