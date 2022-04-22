import ls from 'local-storage';

import asAction from "../../helpers/as-redux-action";
import {
    AT_LOGIN_PAGE,
    LEFT_LOGIN_PAGE,
    LOAD_ACCOUNT,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from "./types";
import {
    login as loginRequest, logout as logoutRequest,
    oAuthLogin as oAuthLoginRequest, register as registerRequest,
    oAuthRegister as oAuthRegisterRequest
} from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import history from '../../history';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info';

import NameValidator from '../../validators/name';
import PasswordValidator from '../../validators/password';
import EmailValidator from '../../validators/email';


function loginSuccess(user) {
    return asAction(LOGIN_SUCCESS, user);
}

function loginFailed(errors) {
    return asAction(LOGIN_FAILED, errors);
}

function registerSuccess(user) {
    return asAction(REGISTER_SUCCESS, user);
}

function registerFailed(errors) {
    return asAction(REGISTER_FAILED, errors);
}

function logoutSuccess() {
    return asAction(LOGOUT_SUCCESS);
}

export function leftLoginPage() {
    return asAction(LEFT_LOGIN_PAGE);
}

export function atLoginPage() {
    return asAction(AT_LOGIN_PAGE);
}

export function logout() {
    return async (dispatch) => {
        await logoutRequest();
        ls.set('account', null);
        dispatch(logoutSuccess());
        history.push('/auth/login');
    }
}

export function loadAccount() {
    return async (dispatch) => {
        const account = ls.get('account');
        if (!account || account === 'undefined')
            return;
        
        dispatch(asAction(LOAD_ACCOUNT, JSON.parse(account)));
    }
}

export function login(email, password) {
    const validateStandardLoginData = () => {
        let errors = {};
        errors['email'] = EmailValidator.validate(email);

        return errors;
    }

    return async (dispatch) => {
        let errors = validateStandardLoginData();
        if (!errorsAreEmpty(errors)) {
            loginFailed(errors);
            return;
        }

        const loginRequestResult = await loginRequest(email, password);
        handleLoginRequestResponse(loginRequestResult, dispatch);
    }
}

export function oAuthLogin(oAuthData) {
    return async (dispatch) => {
        const loginRequestResult = await oAuthLoginRequest(oAuthData.tokenId);
        handleLoginRequestResponse(loginRequestResult, dispatch);
    }
}

function handleLoginRequestResponse(loginRequestResult, dispatch) {
    if (loginRequestResult.error) {
        if (requestErrorHasAdditionalInfo(loginRequestResult.error))
            dispatch(loginFailed(loginRequestResult.error.data['errors']));
        else
            dispatch(loginFailed({ error: 'failed to login, please try again later' }));
        return;
    }

    const account = loginRequestResult.data;
    ls.set('account', JSON.stringify(account));

    dispatch(loginSuccess(account));

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
        let errors = validateStandardRegistrationData();
        if (!errorsAreEmpty(errors)) {
            dispatch(registerFailed(errors));
            return;
        }

        const registrationRequestResult = await registerRequest(registerData);
        handleRegisterRequestResponse(registrationRequestResult, dispatch);
    }
}

export function oAuthRegister(oAuthData) {
    return async (dispatch) => {
        const oAuthRegistrationRequestResult = await oAuthRegisterRequest(oAuthData.tokenId);
        handleRegisterRequestResponse(oAuthRegistrationRequestResult, dispatch);
    }
}

function handleRegisterRequestResponse(registrationRequestResult, dispatch) {
    if (registrationRequestResult.error) {
        if (requestErrorHasAdditionalInfo(registrationRequestResult.error))
            dispatch(registerFailed(registrationRequestResult.error.data['errors']));
        else
            dispatch(registerFailed({ error: 'failed to login, please try again later' }));
        return;
    }

    const account = registrationRequestResult.data;

    ls.set('account', JSON.stringify(account));

    dispatch(registerSuccess(account));

    history.push('/account');
}