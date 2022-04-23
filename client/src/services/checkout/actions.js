import asAction from '../../helpers/as-redux-action';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';
import history from '../../history';
import { bookClass, getBookingDetailsFromSession } from './api';
import { CHECKOUT_FAILED, CHECKOUT_SUCCESS, LOAD_BOOKING_DETAILS_FAILED, LOAD_BOOKING_DETAILS_SUCCESS } from './types';

function loadBookingDetailsSuccess(bookingDetails) {
    return asAction(LOAD_BOOKING_DETAILS_SUCCESS, bookingDetails);
}

function loadBookingDetailsFailed(errors) {
    return asAction(LOAD_BOOKING_DETAILS_FAILED, errors);
}

function checkoutSuccess() {
    return asAction(CHECKOUT_SUCCESS);
}

function checkoutFailed(errors) {
    return asAction(CHECKOUT_FAILED, errors);
}

export function loadBookingDetails() {
    return async (dispatch) => {
        const bookingDetails = await sessionActiveWrapper(getBookingDetailsFromSession);
        if (bookingDetails.status === statusEnum.sessionNotActive) {
            dispatch(loadBookingDetailsFailed({error: 'Session not active'}));
            history.push('/');
            return;
        }

        if (bookingDetails.status === statusEnum.error) {
            dispatch(loadBookingDetailsFailed(bookingDetails.error));
            return;
        }

        dispatch(loadBookingDetailsSuccess(bookingDetails));
    }
}

export function checkout(card, stripe, recaptchaValue) {
    return async (dispatch) => {        
        const cardTokenResponse = await stripe.createToken(card)

        if (cardTokenResponse.error) {
            dispatch(checkoutFailed({'payment': cardTokenResponse.error.message}));
            return;
        }

        const bookingResponse = await sessionActiveWrapper(bookClass, cardTokenResponse.token.id, recaptchaValue);
        if (bookingResponse.status === statusEnum.error) {
            if (requestErrorHasAdditionalInfo(bookingResponse.error))
                dispatch(checkoutFailed(bookingResponse.error.data['errors']));
            else
                dispatch(checkoutFailed({payment: 'Payment failed, please try again'}));
            return
        }

        if (bookingResponse.status === statusEnum.sessionNotActive) {
            dispatch(checkoutFailed({booking: 'Session not active'}));
            return;
        }

        dispatch(checkoutSuccess());
        history.push('booking-success');
    }

}