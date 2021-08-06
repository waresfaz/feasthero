import asAction from '../../helpers/as-redux-action';
import { GET_ALL_CLASSES } from "./types";
import { getAllClasses as fetchAllClasses } from './api';

export function getAllClasses() {
    return async (dispatch) => {
        const classes = await fetchAllClasses();
        dispatch(asAction(GET_ALL_CLASSES, classes));
    }
}