import React from 'react';

import { Image, Row, Col } from 'react-bootstrap';

import Content from './components/content';

import './preview-blog-post.scss';

class PreviewBlogPost extends React.Component {
    render() {
        const { index, postData } = this.props;
        return (
            <>
                <Row style={{ marginBottom: '6rem' }}>
                    {
                        index % 2 === 0
                            ?
                            <Col lg={4}>
                                <Image fluid src={postData.image} alt={postData.title} />
                            </Col>
                            :
                            <Col lg={7}>
                                <Content postData={postData} />
                            </Col>

                    }
                    {
                        index % 2 === 0
                            ?
                            <Col lg={7}>
                                <Content postData={postData} />
                            </Col>
                            :
                            <Col lg={4}>
                                <Image fluid src={postData.image} alt={postData.title} />
                            </Col>

                    }
                </Row>
            </>
        );
    }
}

export default PreviewBlogPost;