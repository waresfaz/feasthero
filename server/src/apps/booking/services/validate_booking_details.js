const BookingSizeValidator = require('../../../validators/booking_size');
const findClass = require('../../classes/services/find_class');
const EmailValidator = require('../../../validators/email');
const NameValidator = require('../../../validators/name');
const NotEmptyValidator = require('../../../validators/not_empty');
const BooleanValidator = require('../../../validators/boolean');
const DateTimeValidator = require('../../../validators/datetime');
const CalculateTotals = require('../../../helpers/calculate_totals');


async function validateBookingDetails(bookingDetails) {
    const bookingSizeValidated = BookingSizeValidator.validate(bookingDetails.bookingSize);
    if (!bookingSizeValidated.valid === true)
        return bookingSizeValidated.info;

    const classData = await findClass(bookingDetails.classId);

    const classScheduleValidated = DateTimeValidator.validate(bookingDetails.selectedClassDateTime, classData.schedule)
    if (classScheduleValidated.valid === false)
        return classScheduleValidated.info;

    const customerEmailValidated = EmailValidator.validate(bookingDetails.customerEmail)
    if (customerEmailValidated.valid === false)
        return customerEmailValidated.info;

    const customerFirstNameValidated = NameValidator.validate(bookingDetails.customerFirstName)
    if (customerFirstNameValidated.valid === false)
        return customerFirstNameValidated.info;

    const customerLastNameValidated = NameValidator.validate(bookingDetails.customerLastName);
    if (customerLastNameValidated.valid === false)
        return customerLastNameValidated.info;

    const companyNameValidated = NotEmptyValidator.validate(bookingDetails.companyName)
    if (companyNameValidated.valid === false)
        return 'company name ' + companyNameValidated.info

    const mealKitsBookedValidated = BooleanValidator.validate(bookingDetails.mealKitsBooked);
    if (mealKitsBookedValidated.valid === false)
        return 'mealkits included is ' + mealKitsBookedValidated.info;

    if (!checkTotals(classData, bookingDetails))
        return 'totals do not add up';

    return null;
}

function checkTotals(classData, bookingDetails) {
    const totals = CalculateTotals.totals(bookingDetails.bookingSize, classData.costPerDevice,
        classData.mealKitPrice, bookingDetails.bookingSize,
        bookingDetails.mealKitsBooked);

    if (totals.tax !== bookingDetails.tax)
        return false;
    if (totals.mealKitsTotal !== bookingDetails.mealKitsTotal)
        return false;
    if (totals.devicesTotal !== bookingDetails.devicesTotal)
        return false;
    if (totals.grandTotal !== bookingDetails.grandTotal)
        return false;
    if (totals.subTotal !== bookingDetails.subTotal)
        return false;

    return true;
}

module.exports = validateBookingDetails;