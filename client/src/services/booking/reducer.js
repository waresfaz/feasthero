import {
    GET_CLASS_DATA_FAILED,
    GET_ClASS_DATA_SUCCESS,
    SELECT_CLASS_FOR_BOOKING,
    SUBMIT_BOOKING_FAILED,
    SUBMIT_BOOKING_SUCCESS,
    UPDATE_BOOKING_DETAILS,
} from './types';

function bookingReducer(state = {bookingErrors: {}}, action) {
    switch (action.type) {
        case SELECT_CLASS_FOR_BOOKING:
            return {
                ...state,
                classData: action.value
            }
        case GET_ClASS_DATA_SUCCESS:
            return {
                ...state,
                classData: action.value,
                bookingDetails: {
                    ...state.bookingDetails,
                    classId: action.value._id,
                }
            }
        case GET_CLASS_DATA_FAILED:
            return {
                ...state,
                getClassDataError: true,
            }
        case SUBMIT_BOOKING_FAILED:
            return {
                ...state,
                bookingErrors: action.value
            }
        case SUBMIT_BOOKING_SUCCESS:
            return {
                ...state,
                bookingDetails: {},
                bookingErrors: {}
            }
        case UPDATE_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    ...action.value
                }
            }
        default:
            return state;
    }
}

export default bookingReducer;