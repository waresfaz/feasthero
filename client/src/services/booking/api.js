import feastHeroAxios from '../axios/feast-hero-axios';

import {
    INIT_BOOKING_DETAILS_SESSION,
    IS_BOOKING_SESSION_ACTIVE,
    SHARE_CONFIRMATION
} from '../../constants/api-constants';
import didCorsFail from '../../helpers/cors-failed';

export async function initBookingDetailsSession(bookingDetails) {
    const response = await feastHeroAxios.post(INIT_BOOKING_DETAILS_SESSION, bookingDetails, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response.data }));

    return response;
}

export async function isBookingSessionActive() {
    const response = await feastHeroAxios.get(IS_BOOKING_SESSION_ACTIVE, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error;
}

export async function sendConfirmations(emails) {
    const response = await feastHeroAxios.post(SHARE_CONFIRMATION, { 'emails': emails }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));

    return response;
}