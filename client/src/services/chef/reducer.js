import {
    ADD_CLASS_FAILED,
    ADD_CLASS_SUCCESS,
    HIDE_ADD_CLASS_MODAL,
    LOAD_ALL_CLASSES_FAILED,
    LOAD_ALL_CLASSES_SUCCESS,
    LOAD_CLASS_FAILED,
    LOAD_CLASS_SUCCESS,
    SELECT_CLASS,
    SHOW_ADD_CLASS_MODAL
} from "./types";

export default function chefReducer(state = {loadClassError: false, addClassErrors: {}}, action) {
    switch (action.type) {
        case LOAD_ALL_CLASSES_SUCCESS:
            return {
                ...state,
                allClasses: action.value,
            }
        case LOAD_ALL_CLASSES_FAILED:
            return {
                ...state,
                loadAllClassesError: true,
            }
        case LOAD_CLASS_FAILED:
            return {
                ...state,
                loadClassError: true,
            }
        case LOAD_CLASS_SUCCESS:
            return {
                ...state,
                currentClass: action.value
            }
        case ADD_CLASS_FAILED:
            return {
                ...state,
                addClassErrors: action.value
            }
        case ADD_CLASS_SUCCESS:
            return {
                ...state,
                showAddClassModal: false,
                allClasses: [...state.allClasses, action.value]
            }
        case SHOW_ADD_CLASS_MODAL:
            return {
                ...state,
                showAddClassModal: true,
            }
        case HIDE_ADD_CLASS_MODAL:
            return {
                ...state,
                showAddClassModal: false,
                addClassErrors: {}
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