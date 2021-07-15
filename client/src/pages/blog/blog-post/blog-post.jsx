import React from 'react';
import HttpRequestDidSucceed from '../../../hoc/http-request-did-succeed/http-request-did-succeed';
import { fetchBlogPost } from '../../../services/blog/api';

class BlogPost extends React.Component {
    render() {
        return (
            <>
                {
                    <p>{JSON.stringify(this.props.postData)}</p>
                }
            </>
        );
    }
}

export default HttpRequestDidSucceed(BlogPost, fetchBlogPost, 'postData', 'id');