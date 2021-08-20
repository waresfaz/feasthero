import { GET_CLASS, GET_CLASSES } from './types';

function classesReducer(state = [], action) {
    switch (action.type) {
        case GET_CLASSES:
            return {
                ...state,
                allClasses: action.value
            };
        case GET_CLASS:
            return {
                ...state,
                selectedClass: action.value,
            }
        default:
            return state;
    }
}

export default classesReducer;