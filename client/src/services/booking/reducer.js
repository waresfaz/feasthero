import {
    UPDATE_ALL_COSTS,
    UPDATE_BOOKER_AND_BOOKING_DETAILS,
    RESET,
    UPDATE_CLASS_ID,
    SET_BOOKING_ERRORS,
    SET_BOOKING_SUBMIT_IS_LOADING
} from './types';


const initialBookingDetails = {
    classId: '',
    timeSlotId: '',
    grandTotal: 0.00,
    tax: 0.00,
    subTotal: 0.00,
    devicesTotal: 0.00,
    mealKitsTotal: 0.00,
    mealKitsBooked: false,
    bookingSize: 0.00,
    selectedClassDateTime: null,
    customerFirstName: '',
    customerLastName: '',
    companyName: '',
    customerEmail: '',
}

function bookingReducer(state = { bookingDetails: initialBookingDetails, bookingErrors: {}, bookingSubmitIsLoading: false }, action) {
    switch (action.type) {
        case UPDATE_ALL_COSTS:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    ...action.value
                }
            }
        case UPDATE_BOOKER_AND_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    ...action.value
                }
            }
        case RESET:
            return {
                ...state,
                bookingDetails: {
                    ...initialBookingDetails
                }
            }
        case UPDATE_CLASS_ID:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    classId: action.value
                }
            }
        case SET_BOOKING_SUBMIT_IS_LOADING:
            return {
                ...state,
                bookingSubmitIsLoading: action.value
            }
        case SET_BOOKING_ERRORS:
            return {
                ...state,
                bookingErrors: action.value,
            }
        default:
            return state;
    }
}

export default bookingReducer;