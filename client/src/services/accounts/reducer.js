import { SET_ACCOUNT } from "./types";

export default function accountsReducer(state = [], action) {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                accountData: action.value,
            }
        default:
            return state;
    }
}