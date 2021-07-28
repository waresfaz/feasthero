class BooleanValidator {
    static validate(value) {
        if (value !== true && value !== false)
            return 'must be true or false';

        return null;
    }
}

export default BooleanValidator;