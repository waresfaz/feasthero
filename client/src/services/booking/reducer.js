import { UPDATE_BOOKING_DETAILS } from './types';

const initialBookingDetails = {
    cost: 0,
    hasMealKit: false,
    bookingSize: 0,
    selectedClassDateTime: null,
    firstName: '',
    lastName: '',
    companyName: '',
    emailAddress: '',
}

function bookingReducer(state = {bookingDetails: initialBookingDetails}, action) {
    switch (action.type) {
        case UPDATE_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: action.value
            };
        default:
            return state;
    }
}

export default bookingReducer;