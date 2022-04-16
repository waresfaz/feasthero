import { SET_BOOKING_DETAILS, SET_LOAD_BOOKING_DETAILS_ERROR, SET_CHECKOUT_ERRORS, SET_RECAPTCHA_ERROR, SET_SEND_PAYMENT_LOADING } from "./types";

export default function checkoutReducer(state = {checkoutErrors: {}, sendPaymentLoading: false}, action) {
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
        case SET_SEND_PAYMENT_LOADING:
            return {
                ...state,
                sendPaymentLoading: action.value
        }
        default:
            return state;
    }
}