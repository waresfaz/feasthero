import asAction from '../../helpers/as-redux-action';
import { GET_ALL_CLASSES, GET_CLASS, SET_CURRENT_CLASS } from "./types";
import { allChefsClasses, getClassForChef } from './api';
import formatClassSchedule from '../../helpers/format-class-schedule';

export function getAllClasses() {
    return async (dispatch) => {
        const classes = formatClassSchedule(await allChefsClasses());
        dispatch(asAction(GET_ALL_CLASSES, classes));
    }
}

export function setCurrentClass(classData) {
    return asAction(SET_CURRENT_CLASS, classData);
}

export function getClass(classId) {
    return async (dispatch) => {
        console.log(await getClassForChef(classId))
        const classData = formatClassSchedule(await getClassForChef(classId));
        dispatch(asAction(GET_CLASS, classData));
    }
}