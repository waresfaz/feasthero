import asAction from "../../helpers/as-redux-action"
import { fetchAllBlogPosts, fetchBlogPost } from "./api";
import { LOAD_POST_SUCCESS, SELECT_BLOG_POST } from "./types"


function loadPostSuccess(postData) {
    return asAction(LOAD_POST_SUCCESS, postData);
}

export function selectBlogPost(postData) {
    return asAction(SELECT_BLOG_POST, postData);
}

export function loadPosts() {
    return async () => {
        const blogPosts = await fetchAllBlogPosts();

        if (blogPosts.error)
            throw new Error('Error loading blog, please try again.')

        return blogPosts;
    }
}

export function loadPost(postId) {
    return async (dispatch, getState) => {
        if (getState().blog.selectedPost)
            return getState().blog.selectedPost;

        const postData = await fetchBlogPost(postId);

        if (postData.error)
            throw new Error('Failed to load blog post, please try again.');

        dispatch(loadPostSuccess(postData));

        return postData;
    }
}