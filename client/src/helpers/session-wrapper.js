import store from '../redux/store/index';
import history from '../history';

import { newError } from '../services/feasthero/actions';
import { SESSION_EXPIRED_ERROR } from '../constants/app-constants';

export const statusEnum = { error: 1, sessionExpired: 2 };


/**
 * wraps a rest api call to make sure there is a session active 
 * 
 * @since 2.0.0
 * 
 * @param {function} apiCallFn - function that will be calling the rest api 
 * @param  {...any} args - arguments to pass to the api call
 * 
 * @returns {any}
 */

export async function sessionWrapper(apiCallFn, ...args) {
    const response = await apiCallFn(...args);

    if (response.error === 408) {
        store.dispatch(newError(SESSION_EXPIRED_ERROR));
        history.push('/');
        return statusEnum.sessionExpired;
    }

    if (response.error)
        return statusEnum.error;

    return response;
}