import React from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import Button from '../../../../components/button/button';

import './subscribe.scss';

class Subscribe extends React.Component {
    render() {
        return (
            <section id='subscribe-section'>
                <Container fluid>
                    <Row className='w-100' id='subscribe-content-container'>
                        <Col lg={5} id='subscribe-text'>
                            <h4>Stay in the loop</h4>
                            <p>
                                Be the first to find out about new classes and updates.
                        </p>
                        </Col>
                        <Col md={7} lg={4}>
                            <form>
                                <Form.Group>
                                    <Form.Control required
                                        type='email'
                                        placeholder='example@gmail.com' />
                                </Form.Group>
                                <Row>
                                    <Col md={7} sm={7}>
                                        <Button type='submit' asButton={true} secondary={true}>Stay Connected</Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Subscribe;