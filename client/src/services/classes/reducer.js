import { GET_CLASSES_FOR_BOOKING } from './types';

function classesReducer(state = [], action) {
    switch (action.type) {
        case GET_CLASSES_FOR_BOOKING:
            return {
                ...state,
                allClassesForBooking: action.value
            };
        default:
            return state;
    }
}

export default classesReducer;