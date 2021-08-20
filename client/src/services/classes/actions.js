import { GET_CLASS, GET_CLASSES } from './types';
import { fetchAllClasses, getClass as getClassRequest } from './api';
import asAction from '../../helpers/as-redux-action';

function getAllClasses() {
    return async (dispatch) => {
        const classes = await fetchAllClasses();
        dispatch(asAction(GET_CLASSES, classes));
    }
}

function getClass(classId) {
    return async (dispatch) => {
        const classData = await getClassRequest(classId);
        dispatch(asAction(GET_CLASS, classData));
    }
}

export { getAllClasses, getClass }