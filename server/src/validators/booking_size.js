const { VALID_BOOKING_SIZES } = require('../constants/app_constants');

class BookingSizeValidator {
    static validate(value) {
        const bookingSizeUpperBounds = VALID_BOOKING_SIZES[VALID_BOOKING_SIZES.length - 1].value;
        const bookingSizeLowerBounds = VALID_BOOKING_SIZES[0].value

        value = Number(value);

        if (!value)
            return { valid: false, info: 'booking size cannot be empty' };

        if (value % 1 !== 0) {
            return { valid: false, info: 'booking size must be a whole number' };
        }

        if (value > bookingSizeUpperBounds || value < bookingSizeLowerBounds)
            return { valid: false, info: 'booking size out of range' };

        return { valid: true };
    }
}

module.exports = BookingSizeValidator;