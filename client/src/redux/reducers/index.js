import { combineReducers } from 'redux';

import classesReducer from '../../services/classes/reducer';
import bookingReducer from '../../services/booking/reducer';

const rootReducer = combineReducers({
    classes: classesReducer,
    booking: bookingReducer,
})

export default rootReducer;