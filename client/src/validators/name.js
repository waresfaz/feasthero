class NameValidators {
    static validate(name) {
        if (!name) {
            return 'cannot be empty';
        } else {
            if (!name.match(/^[a-zA-Z]+$/))
                return 'only letters';
        }
        return null;
    }
}

export default NameValidators;