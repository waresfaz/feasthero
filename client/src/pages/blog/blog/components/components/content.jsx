import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import timeSince from '../../../../../helpers/time-since-date';
import truncateString from '../../../../../helpers/truncate-string';

import './content.scss';

class Content extends React.Component {
    render() {
        const { postData } = this.props;
        return (
            <>
                <section className='content'>
                    <h1>{postData.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: truncateString(postData.content, 600) }} />
                    <Link to={`/blog/post/${postData._id}`}>Read More</Link>
                    <div className='d-flex'>
                        <p>By <b>{postData.author}</b>,</p>
                        <p className='time-since-post'>{timeSince(new Date(postData.datePosted))} ago</p>
                    </div>
                </section>
            </>
        );
    }
}

export default Content;