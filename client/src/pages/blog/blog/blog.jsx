import React from 'react';

import { Container } from 'react-bootstrap';

import Title from '../../../components/title/title';
import PreviewBlogPost from './components/preview-blog-post';

import HttpRequestDidSucceed from '../../../hoc/http-request-did-succeed/http-request-did-succeed';
import { fetchAllBlogPosts } from '../../../services/blog/api';

import './blog.scss';

class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            postData: null
        };
    }

    render() {
        const { blogPosts, httpRequestError } = this.props;
        return (
            <>
                <Container id='blog'>
                    <Title className='mb-5'>Blog</Title>
                    {
                        httpRequestError
                            ?
                            <h4 className='text-danger mt-4'>Error loading blog, please try again</h4>
                            :
                            blogPosts.length !== 0
                                ?
                                <div id='preview-blog-posts'>
                                    {
                                        blogPosts.map((post, key) => {
                                            return <PreviewBlogPost postData={post} index={key} key={key} />

                                        })
                                    }
                                </div>
                                :
                                <h4 className='text-center mt-5'>No blog posts yet...</h4>

                    }
                </Container>
            </>
        )
    }
}

export default HttpRequestDidSucceed(Blog, fetchAllBlogPosts, 'blogPosts');