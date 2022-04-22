import { CHECKOUT_FAILED, LOAD_BOOKING_DETAILS_FAILED, LOAD_BOOKING_DETAILS_SUCCESS } from "./types";

export default function checkoutReducer(state = {loadBookingDetailsErrors: {}, checkoutErrors: {}}, action) {
    switch (action.type) {
        case LOAD_BOOKING_DETAILS_FAILED:
            return {
                ...state,
                loadBookingDetailsErrors: action.value
            }
        case LOAD_BOOKING_DETAILS_SUCCESS:
            return {
                ...state,
                bookingDetails: action.value,
            }
        case CHECKOUT_FAILED:
            return {
                ...state,
                checkoutErrors: action.value,
            }
        default:
            return state;
    }
}