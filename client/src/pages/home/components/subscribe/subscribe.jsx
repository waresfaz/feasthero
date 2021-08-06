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
            formErrors: {}
        }
    }

    resetSuccessSubscribed = () => {
        this.setState({
            successSubscribed: null,
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();

        if (this.state.formErrors)
            this.clearFormErrors();

        if (!this.validate())
            return;

        const subscribed = await subscribe(this.state.email);
        if (subscribed === 'already exists') {
            let formErrors = {};
            formErrors['email'] = 'email already exists';
            this.setState({
                formErrors,
                loading: false,
            });
            return;
        }

        if (!subscribed) {
            this.setState({
                loading: false,
                successSubscribed: false,
            });
            return;
        }

        this.setState({
            loading: false,
            successSubscribed: true,
        });
    }

    clearFormErrors = () => {
        this.setState({
            formErrors: {},
        })
    }

    validate = () => {
        let formErrors = {};
        const { email } = this.state;

        formErrors['email'] = EmailValidator.validate(email);

        let valid = Object.values(formErrors).every(error => error === null);
        if (!valid)
            this.setState({ formErrors });

        return valid;
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value,
        })
    }

    wasSubscribeSuccessful() {
        const { successSubscribed } = this.state;

        if (successSubscribed === true)
            return <h4 className='text-success'>Thank you for subscribing!</h4>

        if (successSubscribed === false)
            return <h4 className='text-danger'>Error, please try again</h4>

        return <></>
    }

    shouldShowSubscribedModal() {
        const { successSubscribed } = this.state;
        return successSubscribed === true || successSubscribed === false
    }

    render() {
        const { formErrors, email, loading } = this.state;
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
                    {this.wasSubscribeSuccessful()}
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
                                            <span className='text-danger'>{formErrors['email']}</span>
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