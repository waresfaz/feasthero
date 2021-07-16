import store from '../redux/store/index';
import history from '../history';

import { newError } from '../services/feasthero/actions';
import { SESSION_EXPIRED_ERROR } from '../constants/app-constants';
import { isBookingSessionActive } from '../services/booking/api';

/**
 * @summary check if booking session is active
 * @returns {Boolean} - true if the session is still active
 */
export default async function checkBookingSessionActive() {
    const response = await isBookingSessionActive();
    if (!response) {
        store.dispatch(newError(SESSION_EXPIRED_ERROR));
        history.push('/');
        return false;
    }
    return true;
}