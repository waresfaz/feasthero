import ls from 'local-storage';

import asAction from "../../helpers/as-redux-action";
import { setAccount } from '../accounts/actions';
import { IS_AT_LOGIN_PAGE, IS_LOADING, SET_ERRORS } from "./types";
import {
    login as loginRequest, logout as logoutRequest,
     oAuthLogin as oAuthLoginRequest, register as registerRequest,
     oAuthRegister as oAuthRegisterRequest
} from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import history from '../../history';
import EmailValidator from '../../validators/email';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';

import NameValidator from '../../validators/name';
import PasswordValidator from '../../validators/password'; 

export function isAtLoginPage(isAtLoginPage) {
    return asAction(IS_AT_LOGIN_PAGE, isAtLoginPage);
}

export function setErrors(errors) {
    return asAction(SET_ERRORS, errors);
}

export function setLoading(isLoading) {
    return asAction(IS_LOADING, isLoading);
}

export function clearErrors() {
    return asAction(SET_ERRORS, {});
}

export function logout() {
    return async (dispatch) => {
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

    history.push('/account');
}

export function register(registerData) {
    const validateStandardRegistrationData = () => {
        let errors = {};
        const { email, firstName, lastName, passwordOne, passwordTwo } = registerData;

        errors['email'] = EmailValidator.validate(email);
        errors['firstName'] = NameValidator.validate(firstName);
        errors['lastName'] = NameValidator.validate(lastName);
        errors['passwordOne'] = PasswordValidator.passwordsEqual(passwordOne, passwordTwo);

        if (!errors['passwordOne'])
            errors['passwordOne'] = PasswordValidator.validate(passwordOne)

        return errors;
    }

    return async (dispatch) => {
        dispatch(setLoading(true));

        let errors = validateStandardRegistrationData();
        if (!errorsAreEmpty(errors)) {
            dispatch(setErrors(errors));
            dispatch(setLoading(false));
            return;
        }

        const registrationRequestResult = await registerRequest(registerData);
        handleRegisterRequestResponse(registrationRequestResult, dispatch);
    }
}

export function oAuthRegister(oAuthData) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        const oAuthRegistrationRequestResult = await oAuthRegisterRequest(oAuthData.tokenId);
        handleRegisterRequestResponse(oAuthRegistrationRequestResult, dispatch);
    }
}

function handleRegisterRequestResponse(registrationRequestResult, dispatch) {
    if (registrationRequestResult.error) {
        if (requestErrorHasAdditionalInfo(registrationRequestResult.error))
            dispatch(setErrors(registrationRequestResult.error.data['errors']));
        else
            dispatch(setErrors({ error: 'failed to login, please try again later' }));
        dispatch(setLoading(false));
        return;
    }

    const account = registrationRequestResult.data;

    ls.set('account', JSON.stringify(account));

    dispatch(setAccount(account));
    dispatch(setLoading(false));

    history.push('/account');
}