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
    UPDATE_BOOKING_DETAILS,
    RESET,
    SET_BOOKING_ERRORS,
    SET_BOOKING_SUBMIT_IS_LOADING,
    SET_CLASS_DATA,
    SET_LOADING_CLASS_DATA,
    SET_ERROR_LOADING_CLASS_DATA,
} from './types';
import { getClassForBooking } from '../classes/api';

export function updateBookingDetails(bookingDetails) {
    return asAction(UPDATE_BOOKING_DETAILS, bookingDetails)
}

export function updateAllCosts(costs) {
    return asAction(UPDATE_ALL_COSTS, costs);
}

export function reset() {
    return asAction(RESET, '');
}

export function setBookingErrors(errors) {
    return asAction(SET_BOOKING_ERRORS, errors);
}

export function clearBookingErrors() {
    return asAction(SET_BOOKING_ERRORS, {});
}

export function setBookingSubmitIsLoading(loading) {
    return asAction(SET_BOOKING_SUBMIT_IS_LOADING, loading);
}

export function setClassData(classData) {
    return asAction(SET_CLASS_DATA, classData);
}

export function setLoadingClassData(loading) {
    return asAction(SET_LOADING_CLASS_DATA, loading);
}

export function setErrorLoadingClassData(isError) {
    return asAction(SET_ERROR_LOADING_CLASS_DATA, isError);
}

export function getClassDataForBooking(classId) {
    return async (dispatch, getState) => {
        let classData;

        dispatch(setLoadingClassData(true));
        if (!getState().booking.classData) {
            classData = await getClassForBooking(classId);
            if (classData.error === true) {
                dispatch(setLoadingClassData(false));
                dispatch(setErrorLoadingClassData(true));
                return;
            }
        }
        else
            classData = getState().booking.classData;

            dispatch(setClassData(classData));
        dispatch(setLoadingClassData(false));
    }
}

export function submitBooking(scheduleOptions) {
    return async (dispatch, getState) => {
        const bookingDetails = getState().booking.bookingDetails;

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

        dispatch(clearBookingErrors());
        dispatch(setBookingSubmitIsLoading(false));

        history.push('/checkout');
    }
}