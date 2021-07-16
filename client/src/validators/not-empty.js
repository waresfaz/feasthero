class NotEmptyValidator {
    static validate(name) {
        if (name === '' || name === null || name === undefined)
            return 'cannot be empty';
        return null;
    }
}

export default NotEmptyValidator;