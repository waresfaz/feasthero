import {
    UPDATE_MEAL_KITS_BOOKED, UPDATE_ALL_COSTS,
    UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS,
    UPDATE_ALL_BOOKING_DETAILS,
    RESET,
    UPDATE_CLASS_ID
} from './types';

export function updateGeneralBookerAndBookingDetails(generalBookerAndBookingDetails) {
    return asAction(UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS, generalBookerAndBookingDetails)
}

export function updatemealKitsBooked(mealKitsBooked) {
    return asAction(UPDATE_MEAL_KITS_BOOKED, mealKitsBooked);
}

export function updateAllCosts(costs) {
    return asAction(UPDATE_ALL_COSTS, costs);
}

export function updateAllBookingDetails(bookingDetails) {
    return asAction(UPDATE_ALL_BOOKING_DETAILS, bookingDetails);
}

export function reset() {
    return asAction(RESET, '');
}

export function updateClassId(classId) {
    return asAction(UPDATE_CLASS_ID, classId);
}

function asAction(type, value) {
    return {
        type: type,
        value: value,
    }
}