import React from 'react';

import { Container } from 'react-bootstrap';

import Title from '../../../components/title/title';
import BlogPosts from './components/posts/blog-posts';


class Blog extends React.Component {
    render() {
        return (
            <>
                <Container id='blog'>
                    <Title className='mb-5'>Blog</Title>
                    <BlogPosts />
                </Container>
            </>
        )
    }
}

export default Blog;