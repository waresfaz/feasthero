import { GET_CLASSES_FOR_BOOKING, SET_CURRENT_CLASS } from './types';
import { getAllClassesForBooking as getAllClassesForBookingRequest } from './api';
import asAction from '../../helpers/as-redux-action';

function getAllClassesForBooking() {
    return async (dispatch) => {
        const classes = await getAllClassesForBookingRequest();
        dispatch(asAction(GET_CLASSES_FOR_BOOKING, classes));
    }
}

function setCurrentClass(classData) {
    return asAction(SET_CURRENT_CLASS, classData);
}

export { getAllClassesForBooking, setCurrentClass }