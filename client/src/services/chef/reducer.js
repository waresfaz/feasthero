import { GET_ALL_CLASSES, GET_CLASS, SET_CURRENT_CLASS, SET_ERRORS, SET_LOADING, SET_SHOW_ADD_CLASS_MODAL } from "./types";

export default function chefReducer(state = {errors: {}, loading: false},  action) {
    switch (action.type) {
        case GET_ALL_CLASSES:
            return {
                ...state,
                allClasses: action.value,
            }
        case SET_CURRENT_CLASS:
            return {
                ...state,
                currentClass: action.value
            }
        case GET_CLASS:
            return {
                ...state,
                currentClass: action.value
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.value
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.value
            }
        case SET_SHOW_ADD_CLASS_MODAL:
            return {
                ...state,
                showAddClassModal: action.value,
            }
        default:
            return state;
    }
}