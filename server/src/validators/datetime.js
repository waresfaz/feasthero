class DateTimeValidator {
    static validate(dateTime, validDateTimes) {
        if (!dateTime)
            return { valid: false, info: 'date time cannot be empty'};

        if (!validDateTimes.find(validDateTime => {
            return validDateTime.dateTime.toString() === dateTime.toString();
        })) {
            return { valid: false, info: 'invalid date time'}
        }

        return { valid: true };
    }
}

module.exports = DateTimeValidator;