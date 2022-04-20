import asAction from "../../helpers/as-redux-action";
import { verifyBookingSuccess as verifyBookingSuccessRequest } from './api';
import { sessionActiveWrapper, statusEnum } from "../../helpers/session-active-wrapper";
import { SET_BOOKING_DETAILS, SET_CLASS_DATA, SET_ERROR } from "./types";
import { errorViewedAtHomePage } from '../feasthero/actions';
import history from "../../history";

function setError(error) {
    return asAction(SET_ERROR, error);
}

function setBookingDetails(bookingDetails) {
    return asAction(SET_BOOKING_DETAILS, bookingDetails);
}

function setClassData(classData) {
    return asAction(SET_CLASS_DATA, classData);
}

export function verifyBookingSuccess() {
    return async (dispatch) => {
        const response = await sessionActiveWrapper(verifyBookingSuccessRequest);

        if (response.status === statusEnum.sessionNotActive) {
            dispatch(errorViewedAtHomePage('Session not active'));
            history.push('/');
            return;
        }

        if (response.status === statusEnum.error) {
            dispatch(setError('Error fetching booking details, please contact customer service to make sure your class was placed'));
            return;
        }

        const { bookingDetails, classData } = response;

        dispatch(setBookingDetails(bookingDetails));
        dispatch(setClassData(classData));
    }
}