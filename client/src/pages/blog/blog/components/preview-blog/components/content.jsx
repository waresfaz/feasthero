import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';

import timeSince from '../../../../../../helpers/time-since-date';
import truncateString from '../../../../../../helpers/truncate-string';
import { selectBlogPost } from '../../../../../../services/blog/actions';

import './content.scss';

class Content extends React.Component {
    render() {
        const { postData } = this.props;
        return (
            <>
                <section className='content'>
                    <h3>{postData.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: truncateString(postData.content, 600) }} />
                    <Link to={`/blog/post/${postData._id}`} onClick={() => this.props.selectPost(postData)}>Read More</Link>
                    <div className='d-flex'>
                        <p>By <b>{postData.author}</b>,</p>
                        <p className='ml-2'>{timeSince(new Date(postData.datePosted))} ago</p>
                    </div>
                </section>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectPost: (postData) => dispatch(selectBlogPost(postData)),
    }
}

export default connect(null, mapDispatchToProps)(Content);