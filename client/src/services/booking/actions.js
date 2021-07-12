import {
    UPDATE_MEAL_KITS_BOOKED, UPDATE_ALL_COSTS,
    UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS
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

function asAction(type, value) {
    return {
        type: type,
        value: value,
    }
}