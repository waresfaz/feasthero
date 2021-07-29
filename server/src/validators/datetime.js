class DateTimeValidator {
    static validate(dateTime, validDateTimes) {
        if (!dateTime)
            return { valid: false, errorMessage: 'date time cannot be empty'};

        if (!validDateTimes.find(validDateTime => {
            return validDateTime.dateTime.toString() === dateTime.toString();
        })) {
            return { valid: false, errorMessage: 'invalid date time'}
        }

        return { valid: true };
    }
}

module.exports = DateTimeValidator;