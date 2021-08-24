import { GET_CLASSES_FOR_BOOKING, SET_CURRENT_CLASS } from './types';

function classesReducer(state = [], action) {
    switch (action.type) {
        case GET_CLASSES_FOR_BOOKING:
            return {
                ...state,
                allClassesForBooking: action.value
            };
        case SET_CURRENT_CLASS:
            return {
                ...state,
                currentClassForBooking: action.value,
            }
        default:
            return state;
    }
}

export default classesReducer;