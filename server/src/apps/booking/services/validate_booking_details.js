const BookingSizeValidator = require('../../../validators/booking_size');
const EmailValidator = require('../../../validators/email');
const NameValidator = require('../../../validators/name');
const NotEmptyValidator = require('../../../validators/not_empty');
const BooleanValidator = require('../../../validators/boolean');
const DateTimeValidator = require('../../../validators/datetime');
const ValidateBookingDetailsCosts = require('./validate_booking_details_costs');

class ValidateBookingDetails {
    constructor(bookingDetails, classData) {
        this.validateBookingDetailsCosts = new ValidateBookingDetailsCosts(bookingDetails, classData);
        this.bookingDetails = bookingDetails;
        this.classData = classData;
    }

    async validate() {
        if (!this.validateBookingDetailsCosts.validate())
            return { valid: false, errorMessage: 'totals to not add up correctly' }

        const validations = [
            this.bookingSize(), this.selectedClassDateTime(), this.customerEmail(),
            this.firstName(), this.lastName(), this.companyName(), this.mealKitsBooked(),
        ]

        for (let i = 0; i < validations.length; i++) {
            const validation = validations[i];
            if (!validation.valid)
                return validation;
        }

        return { valid: true };
    }

    bookingSize() {
        return BookingSizeValidator.validate(this.bookingDetails.bookingSize);
    }

    selectedClassDateTime() {
        return DateTimeValidator.validate(this.bookingDetails.selectedClassDateTime, this.classData.schedule)
    }

    customerEmail() {
        return EmailValidator.validate(this.bookingDetails.customerEmail)
    }

    firstName() {
        return NameValidator.validate(this.bookingDetails.customerFirstName);
    }

    lastName() {
        return NameValidator.validate(this.bookingDetails.customerLastName);
    }

    companyName() {
        let validated = NotEmptyValidator.validate(this.bookingDetails.companyName);
        validated.errorMessage = 'company name ' + validated.errorMessage;
        return validated;
    }

    mealKitsBooked() {
        let validated = BooleanValidator.validate(this.bookingDetails.mealKitsBooked);
        validated.errorMessage = 'booked meal kits is ' + validated.errorMessage;
        return validated;
    }
}

module.exports = ValidateBookingDetails;