const { VALID_BOOKING_SIZES } = require('../constants/app_constants');

class BookingSizeValidator {
    static validate(value) {
        value = Number(value);

        if (!value)
            return 'booking size cannot be empty';

        if (value % 1 !== 0) {
            return 'booking size must be a whole number';
        }

        if (BookingSizeValidator._bookingSizeOutOfRange())
            return 'booking size out of range';
    }

    static _bookingSizeOutOfRange() {
        const bookingSizeUpperBounds = VALID_BOOKING_SIZES[VALID_BOOKING_SIZES.length - 1].value;
        const bookingSizeLowerBounds = VALID_BOOKING_SIZES[0].value
        return value > bookingSizeUpperBounds || value < bookingSizeLowerBounds
    }
}

module.exports = BookingSizeValidator;