import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import useFetch from "../../../../../redux/hooks/fetch";
import { loadPosts } from "../../../../../services/blog/actions";
import PreviewBlogPost from "../preview-blog/preview-blog-post";

function BlogPosts() {
    const posts = useSelector(state => state.blog.posts);
    const error = useSelector(state => state.blog.loadPostsError);

    const loading = useFetch(loadPosts);

    if (loading)
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    if (error)
        return <h4 className='text-danger mt-4'>{error}</h4>
    if (posts.length !== 0) {
        return <div id='preview-blog-posts'>
            {
                posts.map((post, key) => {
                    return <PreviewBlogPost postData={post} index={key} key={key} />

                })
            }
        </div>
    }
    return <h4 className='text-center mt-5'>No blog posts yet...</h4>

}

export default BlogPosts;