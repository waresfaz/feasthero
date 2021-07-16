import { combineReducers } from 'redux';

import classesReducer from '../../services/classes/reducer';
import bookingReducer from '../../services/booking/reducer';
import feastHeroReducer from '../../services/feasthero/reducer';

const rootReducer = combineReducers({
    classes: classesReducer,
    booking: bookingReducer,
    feastHero: feastHeroReducer,
})

export default rootReducer;