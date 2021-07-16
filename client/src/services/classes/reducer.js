import { GET_CLASSES } from './types';

function classesReducer(state = [], action) {
    switch (action.type) {
        case GET_CLASSES:
            return {
                ...state,
                allClasses: action.value
            };
        default:
            return state;
    }
}

export default classesReducer;