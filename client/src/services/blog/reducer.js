import { LOAD_POSTS_FAILED, LOAD_POSTS_SUCCESS, LOAD_POST_FAILED, LOAD_POST_SUCCESS, SELECT_BLOG_POST } from "./types";

function blogReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_POSTS_FAILED:
            return {
                ...state,
                loadPostsError: action.value,
            }
        case LOAD_POSTS_SUCCESS:
            return {
                ...state,
                loadPostsError: '',
                posts: action.value,
            }
        case SELECT_BLOG_POST:
            return {
                ...state,
                selectedPost: action.value
            }
        case LOAD_POST_SUCCESS:
            return {
                ...state,
                selectedPost: action.value,
                loadPostError: ''
            }
        case LOAD_POST_FAILED:
            return {
                ...state,
                loadPostError: action.value
            }
        default:
            return state;
    }
}

export default blogReducer;