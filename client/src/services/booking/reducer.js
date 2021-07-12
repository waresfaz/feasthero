import {
    UPDATE_MEAL_KITS_BOOKED,
    UPDATE_ALL_COSTS,
    UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS,
    UPDATE_ALL_BOOKING_DETAILS,
    RESET,
    UPDATE_CLASS_ID
} from './types';


const initialBookingDetails = {
    classId: '',
    grandTotal: 0,
    tax: 0,
    subTotal: 0,
    devicesTotal: 0,
    mealKitsTotal: 0,
    mealKitsBooked: false,
    bookingSize: 0,
    selectedClassDateTime: null,
    customerFirstName: '',
    customerLastName: '',
    companyName: '',
    customerEmail: '',

}

function bookingReducer(state = initialBookingDetails, action) {
    switch (action.type) {
        case UPDATE_MEAL_KITS_BOOKED:
            return {
                ...state,
                mealKitsBooked: action.value
            }
        case UPDATE_ALL_COSTS:
            return {
                ...state,
                ...action.value
            }
        case UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS:
            return {
                ...state,
                ...action.value
            }
        case UPDATE_ALL_BOOKING_DETAILS:
            return {
                ...state,
                ...action.value
            }
        case RESET:
            return {
                ...state,
                ...initialBookingDetails,
            }
        case UPDATE_CLASS_ID:
            return {
                ...state,
                classId: action.value
            }
        default:
            return state;
    }
}

export default bookingReducer;