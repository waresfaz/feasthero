import axios from 'axios';

import {
    initBookingDetailsSession as initBookingDetailsSessionUrl,
    getBookingDetailsFromSession as getBookingDetailsFromSessionUrl,
    bookClass as bookClassUrl,
    verifyBookingSuccess as verifyBookingSuccessUrl
} from '../../constants/api-constants';

export async function initBookingDetailsSession(bookingDetails) {
    const response = await axios.post(initBookingDetailsSessionUrl, bookingDetails, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error
}

export async function getBookingDetailsFromSession() {
    const response = await axios.get(getBookingDetailsFromSessionUrl, { withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: error.response.status }));
    if (response.error)
        return response;

    return response.data.response;
}

export async function bookClass(cardTokenId) {
    const response = await axios.post(bookClassUrl, { 'cardTokenId': cardTokenId }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response.status }));

    if (response.error)
        return response;

    return response.data.response;
}

export async function verifyBookingSuccess() {
    const response = await axios.get(verifyBookingSuccessUrl, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response.status }));

    if (response.error)
        return response;

    return response.data.response;
}