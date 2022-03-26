import asAction from '../../helpers/as-redux-action';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import history from '../../history';
import { initBookingDetailsSession } from './api';

import BookingSizeValidator from '../../validators/booking-size';
import DateTimeValidator from '../../validators/datetime';
import EmailValidator from '../../validators/email';
import NameValidator from '../../validators/name';
import NotEmptyValidator from '../../validators/not-empty';
import BooleanValidator from '../../validators/boolean';

import {
    UPDATE_ALL_COSTS,
    UPDATE_BOOKER_AND_BOOKING_DETAILS,
    RESET,
    UPDATE_CLASS_ID,
    SET_BOOKING_ERRORS,
    SET_BOOKING_SUBMIT_IS_LOADING,
} from './types';

export function updateBookingDetails(generalbookingDetails) {
    return asAction(UPDATE_BOOKER_AND_BOOKING_DETAILS, generalbookingDetails)
}

export function updateAllCosts(costs) {
    return asAction(UPDATE_ALL_COSTS, costs);
}

export function reset() {
    return asAction(RESET, '');
}

export function updateClassId(classId) {
    return asAction(UPDATE_CLASS_ID, classId);
}

export function setBookingErrors(errors) {
    return asAction(SET_BOOKING_ERRORS, errors);
}

export function setBookingSubmitIsLoading(loading) {
    return asAction(SET_BOOKING_SUBMIT_IS_LOADING, loading);
}

export function submitBooking(bookingDetails, scheduleOptions) {
    return async (dispatch) => {
        const validateBookingDetails = () => {
            let errors = {};
            errors['bookingSize'] = BookingSizeValidator.validate(bookingDetails.bookingSize)
            errors['classDateTime'] = DateTimeValidator.validate(bookingDetails.selectedClassDateTime, scheduleOptions);
            errors['customerEmail'] = EmailValidator.validate(bookingDetails.customerEmail);
            errors['customerFirstName'] = NameValidator.validate(bookingDetails.customerFirstName);
            errors['customerLastName'] = NameValidator.validate(bookingDetails.customerLastName);
            errors['comanyName'] = NotEmptyValidator.validate(bookingDetails.companyName);
            errors['mealKitsBooked'] = BooleanValidator.validate(bookingDetails.mealKitsBooked);
            return errors;
        }

        const handleInitBookingSessionError = (errorResponse) => {
            if (requestErrorHasAdditionalInfo(errorResponse))
                dispatch(setBookingErrors(errorResponse.data['errors']));
            else
                dispatch(setBookingErrors({ error: 'Error creating checkout session, please try again later' }));

            dispatch(setBookingSubmitIsLoading(false));
        }

        dispatch(setBookingSubmitIsLoading(true));

        let errors = validateBookingDetails();
        if (!errorsAreEmpty(errors)) {
            dispatch(setBookingErrors(errors));
            dispatch(setBookingSubmitIsLoading(false));
            return;
        }

        const initBookingSessionResult = await initBookingDetailsSession(bookingDetails);
        if (initBookingSessionResult.error) {
            handleInitBookingSessionError(initBookingSessionResult.error);
            return;
        }

        dispatch(setBookingErrors({}));
        dispatch(setBookingSubmitIsLoading(false));

        history.push('/checkout');
    }
}