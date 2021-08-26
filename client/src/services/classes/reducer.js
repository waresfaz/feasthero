import { SET_CURRENT_CLASS } from './types';

function classesReducer(state = [], action) {
    switch (action.type) {
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