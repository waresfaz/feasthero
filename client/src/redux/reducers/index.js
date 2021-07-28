import { combineReducers } from 'redux';

import classesReducer from '../../services/classes/reducer';
import bookingReducer from '../../services/booking/reducer';
import feastHeroReducer from '../../services/feasthero/reducer';
import authReducer from '../../services/auth/reducer';

const rootReducer = combineReducers({
    classes: classesReducer,
    booking: bookingReducer,
    feastHero: feastHeroReducer,
    auth: authReducer
})

export default rootReducer;