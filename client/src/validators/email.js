class EmailValidator {
    static validate(email) {
        const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email)
            return 'cannot be empty'
        if (!re.test(email))
            return 'invalid email'

        return null;
    }
}

export default EmailValidator;