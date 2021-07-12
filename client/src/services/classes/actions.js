import { GET_CLASSES } from './types';
import { fetchAllClasses } from './api';

function getAllClasses() {
    return async (dispatch) => {
        const classes = await fetchAllClasses();
        dispatch(asAction(classes, GET_CLASSES));
    }
}

function asAction(value, type) {
    return {
        type: type,
        value: value,
    }
}

export { getAllClasses }