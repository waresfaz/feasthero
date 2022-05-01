import { combineReducers } from 'redux';

import bookingReducer from '../../services/booking/reducer';
import authReducer from '../../services/auth/reducer';
import chefReducer from '../../services/chef/reducer';
import checkoutReducer from '../../services/checkout/reducer';
import bookingSuccessReducer from '../../services/booking-success/reducer';
import blogReducer from '../../services/blog/reducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    auth: authReducer,
    chef: chefReducer,
    checkout: checkoutReducer,
    bookingSuccess: bookingSuccessReducer,
    blog: blogReducer
})

export default rootReducer;