import React from 'react';

import { Image, Row, Col } from 'react-bootstrap';

import Content from './components/content';


class PreviewBlogPost extends React.Component {
    render() {
        const { key, postData } = this.props;
        return (
            <>
                <Row>
                    {
                        key % 2 === 0
                            ?
                            <Col lg={7}>
                                <Content postData={postData} />
                            </Col>
                            :

                            <Col lg={4}>
                                <Image src={postData.image} alt={postData.title} />
                            </Col>
                    }
                    {
                        key % 2 === 0
                            ?
                            <Col lg={4}>
                                <Image src={postData.image} alt={postData.title} />
                            </Col>
                            :
                            <Col lg={7}>
                                <Content postData={postData} />
                            </Col>

                    }
                </Row>
            </>
        );
    }
}

export default PreviewBlogPost;