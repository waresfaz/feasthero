import asAction from "../../helpers/as-redux-action";
import { verifyBookingSuccess as verifyBookingSuccessRequest, sendConfirmations as sendConfirmationsRequest } from './api';
import { sessionActiveWrapper, statusEnum } from "../../helpers/session-active-wrapper";
import { BOOKING_SUCCESS_VERIFIED, FAILED_TO_VERIFY_BOOKING_SUCCESS, SEND_CONFIRMATIONS_FAILED, SEND_CONFIRMATIONS_SUCCESS } from './types';

function failedToVerifyBookingSuccess(error) {
    return asAction(FAILED_TO_VERIFY_BOOKING_SUCCESS, error);
}

function bookingSuccessVerified(bookingDetails, classData) {
    return asAction(BOOKING_SUCCESS_VERIFIED, { bookingDetails: bookingDetails, classData: classData });
}

function sendConfirmationsFailed() {
    return asAction(SEND_CONFIRMATIONS_FAILED);
}

function sendConfirmationsSuccess() {
    return asAction(SEND_CONFIRMATIONS_SUCCESS);
}

export function verifyBookingSuccess() {
    return async (dispatch) => {
        const response = await sessionActiveWrapper(verifyBookingSuccessRequest);

        if (response.status === statusEnum.sessionNotActive) {
            dispatch(failedToVerifyBookingSuccess('Session not active'));
            return;
        }

        if (response.status === statusEnum.error) {
            dispatch(failedToVerifyBookingSuccess('Error fetching booking details, please contact customer service to make sure your class was placed'));
            return;
        }

        const { bookingDetails, classData } = response;

        dispatch(bookingSuccessVerified(bookingDetails, classData));
    }
}

export function sendConfirmations(emails) {
    return async (dispatch) => {
        if (emails.length === 0)
            return;

        const response = await sessionActiveWrapper(sendConfirmationsRequest, emails);

        if (response.status === statusEnum.sessionNotActive)
            dispatch(sendConfirmationsFailed());
        if (response.status === statusEnum.error)
            dispatch(sendConfirmationsFailed());
        else
            dispatch(sendConfirmationsSuccess());
    }
}