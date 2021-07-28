import { GET_CLASSES } from './types';
import { fetchAllClasses } from './api';
import asAction from '../../helpers/as-redux-action';

function getAllClasses() {
    return async (dispatch) => {
        const classes = await fetchAllClasses();
        dispatch(asAction(GET_CLASSES, classes));
    }
}

export { getAllClasses }