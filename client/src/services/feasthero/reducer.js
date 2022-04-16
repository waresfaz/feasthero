import { ERROR_VIEWED_AT_HOME_PAGE } from './types';

function feastHeroReducer(state = [], action) {
    switch (action.type) {
        case ERROR_VIEWED_AT_HOME_PAGE:
            return {
                ...state,
                error: action.value
            };
        default:
            return state;
    }
}

export default feastHeroReducer;