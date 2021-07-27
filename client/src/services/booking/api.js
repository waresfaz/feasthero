import axios from 'axios';

import {
    INIT_BOOKING_DETAILS_SESSION,
    GET_BOOKING_DETAILS_FROM_SESSION,
    BOOK_CLASS,
    VERIFY_BOOKING_SUCCESS,
    IS_BOOKING_SESSION_ACTIVE,
    SHARE_CONFIRMATION
} from '../../constants/api-constants';
import didCorsFail from '../../helpers/cors-failed';

export async function initBookingDetailsSession(bookingDetails) {
    const response = await axios.post(INIT_BOOKING_DETAILS_SESSION, bookingDetails, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error
}

export async function getBookingDetailsFromSession() {
    const response = await axios.get(GET_BOOKING_DETAILS_FROM_SESSION, { withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: didCorsFail(error) }));
    if (response.error)
        return response;

    return response.data.response;
}

export async function bookClass(cardTokenId) {
    const response = await axios.post(BOOK_CLASS, { 'cardTokenId': cardTokenId }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    if (response.error)
        return response;

    return response.data.response;
}

export async function verifyBookingSuccess() {
    const response = await axios.get(VERIFY_BOOKING_SUCCESS, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    if (response.error)
        return response;

    return response.data.response;
}

export async function isBookingSessionActive() {
    const response = await axios.get(IS_BOOKING_SESSION_ACTIVE, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error;
}

export async function sendConfirmations(emails) {
    const response = await axios.post(SHARE_CONFIRMATION, { 'emails': emails }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    return response;
}