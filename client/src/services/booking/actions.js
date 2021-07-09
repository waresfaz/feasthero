import { UPDATE_BOOKING_DETAILS } from './types';

function updateBookingDetails(bookingDetails) {
    return {
        type: UPDATE_BOOKING_DETAILS,
        value: bookingDetails
    }
}

export { updateBookingDetails };