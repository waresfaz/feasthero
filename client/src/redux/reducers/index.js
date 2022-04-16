import { combineReducers } from 'redux';

import bookingReducer from '../../services/booking/reducer';
import feastHeroReducer from '../../services/feasthero/reducer';
import authReducer from '../../services/auth/reducer';
import accountsReducer from '../../services/accounts/reducer';
import chefReducer from '../../services/chef/reducer';
import checkoutReducer from '../../services/checkout/reducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    feastHero: feastHeroReducer,
    auth: authReducer,
    account: accountsReducer,
    chef: chefReducer,
    checkout: checkoutReducer
})

export default rootReducer;