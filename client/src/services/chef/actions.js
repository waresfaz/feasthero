import asAction from '../../helpers/as-redux-action';
import { GET_ALL_CLASSES } from "./types";
import { allChefsClasses } from './api';

export function getAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();
        dispatch(asAction(GET_ALL_CLASSES, classes));
    }
}