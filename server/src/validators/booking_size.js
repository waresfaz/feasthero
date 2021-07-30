const { VALID_BOOKING_SIZES } = require('../constants/app_constants');

class BookingSizeValidator {
    static validate(value) {
        value = Number(value);

        if (!value)
            return { valid: false, errorMessage: 'booking size cannot be empty' };

        if (value % 1 !== 0) {
            return { valid: false, errorMessage: 'booking size must be a whole number' };
        }

        if (BookingSizeValidator._bookingSizeOutOfRange())
            return { valid: false, errorMessage: 'booking size out of range' };

        return { valid: true };
    }

    static _bookingSizeOutOfRange() {
        const bookingSizeUpperBounds = VALID_BOOKING_SIZES[VALID_BOOKING_SIZES.length - 1].value;
        const bookingSizeLowerBounds = VALID_BOOKING_SIZES[0].value
        return value > bookingSizeUpperBounds || value < bookingSizeLowerBounds
    }
}

module.exports = BookingSizeValidator;