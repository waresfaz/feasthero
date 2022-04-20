import { SET_BOOKING_DETAILS, SET_CLASS_DATA, SET_ERROR } from "./types";

export default function bookingSuccessReducer(state = {}, action) {
    switch (action.type) {
        case SET_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: action.value
            }
        case SET_CLASS_DATA:
            return {
                ...state,
                classData: action.value
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.value,
            }
        default:
            return state;
    }
}