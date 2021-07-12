import {
    UPDATE_MEAL_KITS_BOOKED,
    UPDATE_ALL_COSTS,
    UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS
} from './types';


const initialBookingDetails = {
    grandTotal: 0,
    tax: 0,
    subTotal: 0,
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
                tax: action.value.tax,
                grandTotal: action.value.grandTotal,
                subTotal: action.value.subTotal,
                mealKitsTotal: action.value.mealKitsTotal
            }

        case UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS:
            return {
                ...state,
                customerFirstName: action.value.customerFirstName,
                customerLastName: action.value.customerLastName,
                selectedClassDateTime: action.value.selectedClassDateTime,
                companyName: action.value.companyName,
                customerEmail: action.value.customerEmail,
                bookingSize: action.value.bookingSize,
            }
        default:
            return state;
    }
}

export default bookingReducer;