import React from 'react';
import { Container } from 'react-bootstrap';

import Title from '../../../components/title/title';
import HttpRequestDidSucceed from '../../../hoc/http-request-did-succeed/http-request-did-succeed';

import { fetchBlogPost } from '../../../services/blog/api';
import timeSince from '../../../helpers/time-since-date';

import './blog-post.scss';


class BlogPost extends React.Component {
    render() {
        let { postData } = this.props;
        postData = postData[0];

        return (
            <>
                <Container className='mt-5'>
                    <section id='post'>
                        <Title className='text-center mb-4'>{postData.title}</Title>
                        <div id='content' dangerouslySetInnerHTML={{ __html: postData.content }} />
                        <div className='d-flex'>
                            <p>By <b>{postData.author}</b>,</p>
                            <p className='ml-2'>{timeSince(new Date(postData.datePosted))} ago</p>
                        </div>
                    </section>
                </Container>

            </>
        );
    }
}

export default HttpRequestDidSucceed(BlogPost, fetchBlogPost, 'postData', 'id');