import { combineReducers } from 'redux';

import classesReducer from '../../services/classes/reducer';

const rootReducer = combineReducers({
    classes: classesReducer,
})

export default rootReducer;