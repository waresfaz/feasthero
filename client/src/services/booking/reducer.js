import {
    UPDATE_MEAL_KITS_BOOKED,
    UPDATE_ALL_COSTS,
    UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS,
    RESET,
    UPDATE_CLASS_ID,
    SET_MEAL_KITS_BOOKED_ERROR
} from './types';


const initialBookingDetails = {
    classId: '',
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

function bookingReducer(state = { bookingDetails: initialBookingDetails }, action) {
    switch (action.type) {
        case UPDATE_MEAL_KITS_BOOKED:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    mealKitsBooked: action.value
                }
            }
        case UPDATE_ALL_COSTS:
            return {
                ...state,
                bookingDetails: {
                    ...state.bookingDetails,
                    ...action.value
                }
            }
        case UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS:
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
                    initialBookingDetails
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
        case SET_MEAL_KITS_BOOKED_ERROR:
            return {
                ...state,
                mealKitsBookedError: action.value,
            }
        default:
            return state;
    }
}

export default bookingReducer;