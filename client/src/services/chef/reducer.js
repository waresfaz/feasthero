import { GET_ALL_CLASSES } from "./types";

export default function chefReducer(state = [], action) {
    switch (action.type) {
        case GET_ALL_CLASSES:
            return {
                ...state,
                allClasses: action.value,
            }
        default:
            return state;
    }
}