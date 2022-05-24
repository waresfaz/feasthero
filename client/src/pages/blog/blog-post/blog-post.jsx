import React from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Title from '../../../components/title/title';
import { loadPost } from '../../../services/blog/actions';
import timeSince from '../../../helpers/time-since-date';

import './blog-post.scss';
import useFetch from '../../../redux/hooks/fetch';


function BlogPost(props) {
    const postData = useSelector(state => state.blog.selectedPost);
    const error = useSelector(state => state.blog.loadPostError);

    const loading = useFetch(loadPost, props.match.params.id);


    if (loading)
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )

    return (
        <>
            <Container className='mt-5'>
                {
                    error
                        ?
                        <h4 className='text-danger mt-4'>{error}</h4>
                        :
                        <section id='post'>
                            <Title>{postData.title}</Title>
                            <div className='text-center my-4'>
                                <Image src={postData.image} alt={postData.title} />
                            </div>
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: postData.content }} />
                            </div>
                            <div className='d-flex content'>
                                <p>By <b>{postData.author}</b>,</p>
                                <p className='ml-2'>{timeSince(new Date(postData.datePosted))} ago</p>
                            </div>
                        </section>
                }
            </Container>

        </>
    );
}

export default BlogPost;