
import { GET_CLASSES_FOR_BOOKING } from './types';
import { getAllClassesForBooking as getAllClassesForBookingRequest } from './api';
import asAction from '../../helpers/as-redux-action';

function getAllClassesForBooking() {
    return async (dispatch) => {
        const classes = await getAllClassesForBookingRequest();
        dispatch(asAction(GET_CLASSES_FOR_BOOKING, classes));
    }
}

export { getAllClassesForBooking }