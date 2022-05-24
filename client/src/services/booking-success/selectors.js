export function selectBookingDetails(state) {
    return state.bookingSuccess.bookingDetails;
}

export function selectCurrentClass(state) {
    return state.bookingSuccess.classData;
}