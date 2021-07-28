class NumberDropdownValidator {
    constructor({ upperBounds, lowerBounds,  mustBeInteger }) {
        this.upperBounds = upperBounds;
        this.lowerBounds = lowerBounds;
        this.mustBeInteger = Boolean(mustBeInteger);
    }

    validate(value) {
        value = Number(value);

        if (!value)
            return 'cannot be empty';
    
        if (this.mustBeInteger && value % 1 !== 0) {
            return 'must be whole numbers';
        }

        if (value > this.upperBounds || value < this.lowerBounds)
            return 'number out of range';

        return null;
    }
}

module.exports = NumberDropdownValidator;