import { BOOKING_SUCCESS_VERIFIED, FAILED_TO_VERIFY_BOOKING_SUCCESS, SEND_CONFIRMATIONS_FAILED, SEND_CONFIRMATIONS_SUCCESS } from "./types";

export default function bookingSuccessReducer(state = {}, action) {
    switch (action.type) {
        case FAILED_TO_VERIFY_BOOKING_SUCCESS:
            return {
                ...state,
                verifyBookingSuccessError: action.value,
            }
        case BOOKING_SUCCESS_VERIFIED:
            return {
                ...state,
                bookingDetails: action.value.bookingDetails,
                classData: action.value.classData,
            }
        case SEND_CONFIRMATIONS_SUCCESS:
            return {
                ...state,
                confirmationsDidSend: true,
            }
        case SEND_CONFIRMATIONS_FAILED:
            return {
                ...state,
                confirmationsDidSend: false,
            }
        default:
            return state;
    }
}