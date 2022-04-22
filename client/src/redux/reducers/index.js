import { combineReducers } from 'redux';

import bookingReducer from '../../services/booking/reducer';
import feastHeroReducer from '../../services/feasthero/reducer';
import authReducer from '../../services/auth/reducer';
import chefReducer from '../../services/chef/reducer';
import checkoutReducer from '../../services/checkout/reducer';
import bookingSuccessReducer from '../../services/booking-success/reducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    feastHero: feastHeroReducer,
    auth: authReducer,
    chef: chefReducer,
    checkout: checkoutReducer,
    bookingSuccess: bookingSuccessReducer,
})

export default rootReducer;