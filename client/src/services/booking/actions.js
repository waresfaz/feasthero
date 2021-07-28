import asAction from '../../helpers/as-redux-action';
import {
    UPDATE_MEAL_KITS_BOOKED, UPDATE_ALL_COSTS,
    UPDATE_GENERAL_BOOKER_AND_BOOKING_DETAILS,
    RESET,
    UPDATE_CLASS_ID,
    SET_MEAL_KITS_BOOKED_ERROR
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

export function reset() {
    return asAction(RESET, '');
}

export function updateClassId(classId) {
    return asAction(UPDATE_CLASS_ID, classId);
}

export function setMealKitsBookedError(error) {
    return asAction(SET_MEAL_KITS_BOOKED_ERROR, error);
}