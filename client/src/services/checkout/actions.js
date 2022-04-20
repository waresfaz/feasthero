import asAction from '../../helpers/as-redux-action';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';
import history from '../../history';
import { bookClass, getBookingDetailsFromSession } from './api';
import { errorViewedAtHomePage } from '../feasthero/actions';
import { SET_BOOKING_DETAILS, SET_LOAD_BOOKING_DETAILS_ERROR, SET_CHECKOUT_ERRORS, SET_CHECKOUT_LOADING } from './types';

export function setBookingDetails(bookingDetails) {
    return asAction(SET_BOOKING_DETAILS, bookingDetails);
}

export function setLoadBookingDetailsError(error) {
    return asAction(SET_LOAD_BOOKING_DETAILS_ERROR, error);
}

export function setCheckoutErrors(errors) {
    return asAction(SET_CHECKOUT_ERRORS, errors);
}

export function setCheckoutLoading(loading) {
    return asAction(SET_CHECKOUT_LOADING, loading);
}

export function loadBookingDetails() {
    return async (dispatch) => {
        const bookingDetails = await sessionActiveWrapper(getBookingDetailsFromSession);
        if (bookingDetails.status === statusEnum.sessionNotActive) {
            dispatch(errorViewedAtHomePage('Session not active'));
            history.push('/');
            return;
        }

        if (bookingDetails.status === statusEnum.error) {
            dispatch(setLoadBookingDetailsError('Error loading booking details'));
            return;
        }

        dispatch(setBookingDetails(bookingDetails));
    }
}

export function checkout(card, stripe, recaptchaValue) {
    return async (dispatch) => {
        dispatch(setCheckoutLoading(true));
        
        const cardTokenResponse = await stripe.createToken(card)

        if (cardTokenResponse.error) {
            dispatch(setCheckoutErrors({'payment': cardTokenResponse.error.message}));
            dispatch(setCheckoutLoading(false));
            return;
        }

        const bookingResponse = await sessionActiveWrapper(bookClass, cardTokenResponse.token.id, recaptchaValue);
        if (bookingResponse.status === statusEnum.error) {
            if (requestErrorHasAdditionalInfo(bookingResponse.error))
                dispatch(setCheckoutErrors(bookingResponse.error.data['errors']));
            else
                dispatch(setCheckoutErrors({payment: 'Payment failed, please try again'}));

            dispatch(setCheckoutLoading(false));
            return
        }

        if (bookingResponse.status === statusEnum.sessionNotActive) {
            dispatch(errorViewedAtHomePage('Session not active'));
            history.push('/');
            return;
        }

        dispatch(setCheckoutLoading(false));

        history.push('booking-success');
    }

}