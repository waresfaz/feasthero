import React from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { loadPosts } from "../../../../../services/blog/actions";
import PreviewBlogPost from "../preview-blog/preview-blog-post";

class BlogPosts extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.props.loadPosts();
        this.setState({ loading: false });
    }

    render() {
        const { posts, error } = this.props;
        const { loading } = this.state;

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
}

const mapStateToProps = (state) => {
    return {
        error: state.blog.loadPostsError,
        posts: state.blog.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: () => dispatch(loadPosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);