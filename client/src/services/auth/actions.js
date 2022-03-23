import ls from 'local-storage';

import asAction from "../../helpers/as-redux-action";
import { setAccount } from '../accounts/actions';
import { IS_AT_LOGIN_PAGE, IS_LOADING, SET_ERRORS } from "./types";
import { login as loginRequest, logout as logoutRequest, oAuthLogin as oAuthLoginRequest } from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import history from '../../history';
import EmailValidator from '../../validators/email';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';

export function isAtLoginPage(isAtLoginPage) {
    return asAction(IS_AT_LOGIN_PAGE, isAtLoginPage);
}

export function setErrors(errors) {
    return asAction(SET_ERRORS, errors);
}

export function setLoading(isLoading) {
    return asAction(IS_LOADING, isLoading);
}

export function logout() {
    return async dispatch => {
        dispatch(setLoading(true));

        await logoutRequest();

        ls.set('account', null);

        dispatch(setAccount(null));
        dispatch(setLoading(false));

        history.push('/auth/login');
    }
}

export function login(email, password) {
    const validateStandardLoginData = () => {
        let errors = {};
        errors['email'] = EmailValidator.validate(email);

        return errors;
    }

    return async (dispatch) => {
        dispatch(setLoading(true));
        
        let errors = validateStandardLoginData();
        if (!errorsAreEmpty(errors)) {
            dispatch(setErrors(errors));
            dispatch(setLoading(false));
            return;
        }

        const loginRequestResult = await loginRequest(email, password);
        handleLoginRequestResponse(loginRequestResult, dispatch);        
    }
}

export function oAuthLogin(oAuthData) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        const loginRequestResult = await oAuthLoginRequest(oAuthData.tokenId);
        handleLoginRequestResponse(loginRequestResult, dispatch);
    }
}

function handleLoginRequestResponse(loginRequestResult, dispatch) {
    if (loginRequestResult.error) {
        if (requestErrorHasAdditionalInfo(loginRequestResult.error))
            dispatch(setErrors(loginRequestResult.error.data['errors']));
        else
            dispatch(setErrors({ error: 'failed to login, please try again later' }));
        dispatch(setLoading(false));
        return;
    }

    const account = loginRequestResult.data;

    ls.set('account', JSON.stringify(account));

    dispatch(setAccount(account));
    dispatch(setLoading(false));
    dispatch(setErrors({}))

    history.push('/account');
}

export function register(email, password) {
    return async (dispatch) => {
        let account = null;

        ls.set('account', JSON.stringify(account))

        dispatch(setAccount(account));

    }
}