import { validBookingSizes } from "../constants/app-constants";

class NumberDropdownValidator {
    static validate(value) {
        const upperBounds = validBookingSizes[validBookingSizes.length - 1].value
        const lowerBounds = validBookingSizes[0].value

        if (!value)
            return 'cannot be empty';

        if (value % 1 !== 0) {
            return 'must be whole numbers';
        }

        if (NumberDropdownValidator._numOutOfRange(value, upperBounds, lowerBounds))
            return 'number out of range';

        return null;
    }

    static _numOutOfRange(value, upperBounds, lowerBounds) {
        return value > upperBounds || value < lowerBounds
    }
}

export default NumberDropdownValidator;