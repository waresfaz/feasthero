export default function bookingDetailsFromBookingState(bookingState) {
    return {
        classId: bookingState.classId,
        timeSlotId: bookingState.timeSlotId,
        grandTotal: bookingState.grandTotal,
        tax: bookingState.tax,
        subTotal: bookingState.subTotal,
        devicesTotal: bookingState.devicesTotal,
        mealKitsTotal: bookingState.mealKitsTotal,
        mealKitsBooked: bookingState.mealKitsBooked,
        bookingSize: bookingState.bookingSize,
        selectedClassDateTime: bookingState.selectedClassDateTime,
        customerFirstName: bookingState.customerFirstName,
        customerLastName: bookingState.customerLastName,
        companyName: bookingState.companyName,
        customerEmail: bookingState.customerEmail,
    }
}