import { SET_BOOKING_DETAILS, SET_LOAD_BOOKING_DETAILS_ERROR, SET_CHECKOUT_ERRORS, SET_RECAPTCHA_ERROR, SET_CHECKOUT_LOADING } from "./types";

export default function checkoutReducer(state = {checkoutErrors: {}, checkoutLoading: false}, action) {
    switch (action.type) {
        case SET_LOAD_BOOKING_DETAILS_ERROR:
            return {
                ...state,
                loadBookingDetailsError: action.value,
            }
        case SET_CHECKOUT_ERRORS:
            return {
                ...state,
                checkoutErrors: action.value,
            }
        case SET_RECAPTCHA_ERROR:
            return {
                ...state,
                recaptchaError: action.value,
            }
        case SET_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: action.value,
            }
        case SET_CHECKOUT_LOADING:
            return {
                ...state,
                checkoutLoading: action.value
        }
        default:
            return state;
    }
}