import store from '../redux/store/index';
import history from '../history';

import { newError } from '../services/feasthero/actions';
import { BOOKING_SESSION_NOT_ACTIVE_ERROR } from '../constants/app-constants';

export const statusEnum = { error: 1, sessionNotActive: 2 };


/**
 * wraps a rest api call to make sure there is a session active 
 * 
 * @param {function} apiCallFn - function that will be calling the rest api 
 * @param  {...any} args - arguments to pass to the api call
 * 
 * @returns {any}
 */

export async function sessionActiveWrapper(apiCallFn, ...args) {
    const response = await apiCallFn(...args);

    if (response.error) {
        if (response.error.status === 408) {
            store.dispatch(newError(BOOKING_SESSION_NOT_ACTIVE_ERROR));
            history.push('/');
            return { status: statusEnum.sessionNotActive };
        }
        return { status: statusEnum.error, error: response.error };

    }

    return response.data;
}