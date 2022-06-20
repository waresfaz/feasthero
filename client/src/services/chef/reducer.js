import {
    ADD_CLASS_SUCCESS,
    LOAD_ALL_CLASSES_SUCCESS,
    LOAD_CLASS_SUCCESS,
    SELECT_CLASS,
} from "./types";

export default function chefReducer(state = [], action) {
    switch (action.type) {
        case LOAD_CLASS_SUCCESS:
            return {
                ...state,
                currentClass: action.value
            }
        case LOAD_ALL_CLASSES_SUCCESS:
            return {
                ...state,
                allClasses: action.value
            }
        case ADD_CLASS_SUCCESS:
            return {
                ...state,
                showAddClassModal: false,
                allClasses: [...state.allClasses, action.value]
            }
        case SELECT_CLASS:
            return {
                ...state,
                currentClass: action.value
            }
        default:
            return state;
    }
}