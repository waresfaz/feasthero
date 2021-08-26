import asAction from '../../helpers/as-redux-action';
import { GET_ALL_CLASSES, GET_CLASS, SET_CURRENT_CLASS } from "./types";
import { allChefsClasses, getClassForChef } from './api';

export function getAllClasses() {
    return async (dispatch) => {
        const classes = await allChefsClasses();
        dispatch(asAction(GET_ALL_CLASSES, classes));
    }
}

export function setCurrentClass(classData) {
    return asAction(SET_CURRENT_CLASS, classData);
}

export function getClass(classId) {
    return async (dispatch) => {
        const classData = await getClassForChef(classId);
        dispatch(asAction(GET_CLASS, classData));
    }
}