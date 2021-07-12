class CompanyNameValidator {
    static validate(name) {
        if (!name)
            return 'cannot be empty';
        return null;
    }
}

export default CompanyNameValidator;