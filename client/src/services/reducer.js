import { NEW_ERROR } from './types';

function feastHeroReducer(state = [], action) {
    switch (action.type) {
        case NEW_ERROR:
            return {
                ...state,
                error: action.value
            };
        default:
            return state;
    }
}

export default feastHeroReducer;