import { combineReducers } from 'redux';

import bookingReducer from '../../services/booking/reducer';
import authReducer from '../../services/auth/reducer';
import chefReducer from '../../services/chef/reducer';
import blogReducer from '../../services/blog/reducer';
import contactReducer from '../../services/contact/reducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    auth: authReducer,
    chef: chefReducer,
    blog: blogReducer,
    contact: contactReducer
})

export default rootReducer;