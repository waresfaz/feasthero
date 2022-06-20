import { LOAD_POST_SUCCESS, SELECT_BLOG_POST } from "./types";

function blogReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_BLOG_POST:
            return {
                ...state,
                selectedPost: action.value
            }
        case LOAD_POST_SUCCESS:
            return {
                ...state,
                selectedPost: action.value,
            }
        default:
            return state;
    }
}

export default blogReducer;