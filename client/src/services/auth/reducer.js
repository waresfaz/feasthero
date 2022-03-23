import { IS_AT_LOGIN_PAGE, IS_LOADING, SET_ERRORS } from "./types";

export default function authReducer(state = {errors: {}, loading: false}, action) {
    switch (action.type) {
        case IS_AT_LOGIN_PAGE:
            return {
                ...state,
                isAtLoginPage: action.value
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value
            }
        case IS_LOADING:
            return {
                ...state,
                loading: action.value
            }
        default:
            return state;
    }
}