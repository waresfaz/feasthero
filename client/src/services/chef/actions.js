import asAction from '../../helpers/as-redux-action';
import { GET_ALL_CLASSES, SET_CURRENT_CLASS } from "./types";
import { allChefsClasses } from './api';

export function getAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();
        dispatch(asAction(GET_ALL_CLASSES, classes));
    }
}

export function setCurrentClass(classData) {
    return asAction(SET_CURRENT_CLASS, classData);
}