import { RESET_CONTACT, SEND_EMAIL_FAILED, SEND_EMAIL_SUCCESS } from "./types";

export default function contactReducer(state = { errors: {} }, action) {
    switch (action.type) {
        case SEND_EMAIL_FAILED:
            return {
                ...state,
                errors: action.value,
                emailSent: false,
            }
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                emailSent: true,
                errors: {}
            }
        case RESET_CONTACT:
            return {
                ...state,
                emailSent: false,
                errors: {}
            }
        default:
            return state;
    }
}