import React from 'react';
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';

import EmailValidator from '../../../../validators/email';
import { subscribe } from '../../../../services/subscribe/api';

import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

import './subscribe.scss';

class Subscribe extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            loading: false,
            successSubscribed: null,
            errors: ''
        }
    }

    resetSuccessSubscribed = () => {
        this.setState({
            successSubscribed: null,
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();

        if (this.state.errors)
            this.clearError();

        const errors = this.validate();
        if (errors)
            return;

        const response = await subscribe(this.state.email);
        if (response.error)
            return this.handleSubscribedError(response.error);

        this.setState({
            loading: false,
            successSubscribed: true,
        });
    }

    clearError = () => {
        this.setState({
            errors: '',
        })
    }

    handleSubscribedError = (errorResponse) => {
        if (this.errorHasAdditionalInfo(errorResponse)) {
            this.setState({
                loading: false,
                successSubscribed: false,
                errors: errorResponse.data['errors']
            });
            return;
        }

        this.setState({
            loading: false,
            successSubscribed: false,
            errors: 'failed to subscribe',
        })
    }

    errorHasAdditionalInfo = (errorResponse) => {
        return (errorResponse.status === 409 || errorResponse.status === 400) && errorResponse.data['errors'];
    }

    validate = () => {
        const { email } = this.state;

        const error = EmailValidator.validate(email);
        if (error)
            this.setState({
                error: error,
                loading: false,
                successSubscribed: false
            })

        return Boolean(error);
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    shouldShowSubscribedModal() {
        const { successSubscribed } = this.state;
        return successSubscribed === true;
    }

    render() {
        const { errors, email, loading } = this.state;
        return (
            <section id='subscribe-section'>
                <Loader show={loading} />
                <Modal
                    backdropClassName='p-5'
                    contentClassName='text-center p-5'
                    centered
                    onHide={this.resetSuccessSubscribed}
                    show={this.shouldShowSubscribedModal()}
                >
                    <h4 className='text-success'>Thank you for subscribing!</h4>
                </Modal>
                <Container>
                    <Row className='w-100' id='subscribe-content'>
                        <Col lg={4} id='subscribe-text'>
                            <h4>Stay in the loop</h4>
                            <p>
                                Be the first to find out about new classes and updates.
                            </p>
                        </Col>
                        <Col lg={6} md={7} >
                            <form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Row>
                                        <Col xl={8} >
                                            <Form.Control
                                                required
                                                value={email}
                                                type='email'
                                                name='email'
                                                onChange={this.handleChange}
                                                placeholder='mail@example.com'
                                            />
                                            <span className='text-danger'>{errors['error']}</span>
                                        </Col>
                                        <Col xl={4} lg={6}>
                                            <Button className='w-100' type='submit' isButton={true} secondary={true}>Stay Connected</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>

                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Subscribe;