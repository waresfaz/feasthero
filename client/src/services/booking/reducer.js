import {
    UPDATE_BOOKING_DETAILS,
    RESET,
    SET_BOOKING_ERRORS,
    SET_BOOKING_SUBMIT_IS_LOADING,
    SET_CLASS_DATA,
    SET_ERROR_LOADING_CLASS_DATA,
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

const initialState = {
    ...initialBookingDetails,
    bookingErrors: {},
    bookingSubmitIsLoading: false,
    errorLoadingClassData: false
}

function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_BOOKING_DETAILS:
            return {
                ...state,
                ...action.value
            }
        case RESET:
            return {
                ...state,
                ...initialBookingDetails
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
        case SET_CLASS_DATA:
            return {
                ...state,
                classData: action.value,
            }
        case SET_ERROR_LOADING_CLASS_DATA:
            return {
                ...state,
                errorLoadingClassData: action.value,
            }
        default:
            return state;
    }
}

export default bookingReducer;