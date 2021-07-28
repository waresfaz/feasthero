import { IS_AT_LOGIN_PAGE } from "./types";

export default function authReducer(state = [], action) {
    switch (action.type) {
        case IS_AT_LOGIN_PAGE:
            return {
                ...state,
                isAtLoginPage: action.value
            }
        default:
            return state;
    }
}