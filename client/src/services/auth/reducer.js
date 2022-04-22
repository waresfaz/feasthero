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

export default function authReducer(state = { loginErrors: {}, registerErrors: {} }, action) {
    switch (action.type) {
        case AT_LOGIN_PAGE:
            return {
                ...state,
                atLoginPage: true
            }
        case LEFT_LOGIN_PAGE:
            return {
                ...state,
                atLoginPage: false
            }
        case LOAD_ACCOUNT:
            return {
                ...state,
                account: action.value
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                account: action.value,
                loginErrors: {},
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginErrors: action.value,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                account: action.value,
                registerErrors: {}
            }
        case REGISTER_FAILED:
            return {
                ...state,
                registerErrors: action.value
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                account: null
            }
        default:
            return state;
    }
}