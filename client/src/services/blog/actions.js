import asAction from "../../helpers/as-redux-action"
import { fetchAllBlogPosts, fetchBlogPost } from "./api";
import { LOAD_POSTS_FAILED, LOAD_POSTS_SUCCESS, LOAD_POST_FAILED, LOAD_POST_SUCCESS, SELECT_BLOG_POST } from "./types"

function loadPostsFailed(error) {
    return asAction(LOAD_POSTS_FAILED, error);
}

function loadPostsSuccess(posts) {
    return asAction(LOAD_POSTS_SUCCESS, posts);
}

function loadPostSuccess(postData) {
    return asAction(LOAD_POST_SUCCESS, postData);
}

function loadPostFailed(error) {
    return asAction(LOAD_POST_FAILED, error);
}

export function selectBlogPost(postData) {
    return asAction(SELECT_BLOG_POST, postData);
}

export function loadPosts() {
    return async (dispatch, getState) => {
        if (getState().blog.posts) return;

        const blogPosts = await fetchAllBlogPosts();

        if (blogPosts.error) {
            dispatch(loadPostsFailed('Error loading blog, please try again.'));
            return; 
        }
        dispatch(loadPostsSuccess(blogPosts));
    }
}

export function loadPost(postId) {
    return async (dispatch, getState) => {
        let postData;

        if (!getState().blog.selectedPost) {
            postData = await fetchBlogPost(postId);

            if (postData.error) {
                dispatch(loadPostFailed('Failed to load blog post, please try again.'));
                return;
            }
        }
        else
            postData = getState().blog.selectedPost;

        dispatch(loadPostSuccess(postData));
    }
}