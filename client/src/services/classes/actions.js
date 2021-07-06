import { GET_CLASSES } from './types';
import { fetchAllClasses } from './api';

function getAllClasses() {
    return async (dispatch) => {
        const classes = await fetchAllClasses();
        dispatch(action(classes));
    }
}

function action(value) {
    return {
        type: GET_CLASSES,
        value: value,
    }
}

export { getAllClasses }