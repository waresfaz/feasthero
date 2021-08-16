import React from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Col, Form, Row, Image } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';


import { bookClass } from '../../../../services/booking/api';
import history from '../../../../history';
import { settings } from '../../../../settings';
import { sessionActiveWrapper, statusEnum } from '../../../../helpers/session-active-wrapper';

import poweredbystripe from '../../../../assets/resources/images/powered-by-stripe.png';

import './payment.scss';

const InjectedPaymentForm = (props) => {
    return (
        <ElementsConsumer>
            {({ elements, stripe }) => (
                <Payment elements={elements} stripe={stripe} {...props} />
            )}
        </ElementsConsumer>
    );
};

class Payment extends React.Component {
    constructor() {
        super();
        this.recaptchaRef = React.createRef();
        this.state = {
            errors: {},
            loading: false,
        }
    }


    handleChange = ({ error }) => {
        if (error)
            this.setState({ errors: { card: error.message } });
        else
            this.setState({ errors: { card: '' } });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.errors['card'])
            return;

        if (this.stripeIsUnitialized())
            return;

        const { stripe, elements } = this.props;

        this.setState({ loading: true });

        const card = elements.getElement(CardElement);
        const cardTokenResponse = await stripe.createToken(card)

        if (cardTokenResponse.error) {
            this.setState({
                errors: { card: cardTokenResponse.error.message },
                loading: false,
            })
            return;
        }

        const bookingResponse = await sessionActiveWrapper(bookClass, cardTokenResponse.token.id, this.recaptchaRef.current.getValue());
        this.resetReCaptcha();
        if (bookingResponse.status === statusEnum.error) {
            return this.handleBookingRequestError(bookingResponse.error);
        }
        if (bookingResponse.status === statusEnum.sessionNotActive)
            return;

        this.setState({
            loading: false,
        })

        history.push('booking-success');
    }

    stripeIsUnitialized = () => {
        const { stripe, elements } = this.props;
        return !stripe || !elements;
    }

    handleBookingRequestError = (errorResponse) => {
        if (this.requestErrorHasMoreInfo(errorResponse))
            this.setState({
                errors: errorResponse.data['errors'],
                loading: false,
            });
        else
            this.setState({
                errors: { payment: 'booking failed' },
                loading: false
            });
    }

    requestErrorHasMoreInfo = (errorResponse) => {
        return (errorResponse.status === 400) && errorResponse.data['errors'];
    }

    resetReCaptcha = () => {
        window.grecaptcha.reset();
    }

    cardElementOptions = () => {
        return {
            hidePostalCode: true,
            style: {
                base: {
                    color: '#303238',
                    fontSize: '16px',
                    fontSmoothing: 'antialiased',
                    '::placeholder': {
                        color: '#CFD7DF',
                    },
                },
                invalid: {
                    color: '#e5424d',
                    ':focus': {
                        color: '#303238',
                    },
                },
            },
        };
    }

    clearErrors = () => {
        this.setState({
            errors: {}
        })
    }

    render() {
        return (
            <div id='payment'>
                <Form onSubmit={this.handleSubmit}>
                    <div id='card-element-container'>
                        <p className='text-center'>Pay with card</p>
                        <Form.Group>
                            <CardElement className='mb-3' onChange={this.handleChange} options={this.cardElementOptions()} />
                            <span className='text-danger'>{this.state.errors['card']}</span>
                            <div className='my-4'>
                                <div className='d-flex justify-content-center'>
                                    <ReCAPTCHA
                                        ref={this.recaptchaRef}
                                        sitekey={settings.RECAPTCHA_SITE_KEY}
                                    />
                                </div>
                                <span className='text-danger d-block text-center'>{this.state.errors['recaptcha']}</span>
                            </div>

                            <button className='pay-btn mat-btn' type='submit' disabled={!this.props.stripe}>
                                {
                                    this.state.loading ? <div className='loader'></div> : <p>Pay ${this.props.bookingDetails.grandTotal}</p>

                                }
                            </button>
                            <button className='pay-btn mat-btn mt-3 danger' onClick={() => history.push('/')} type='submit' disabled={!this.props.stripe}>
                                Cancel
                            </button>
                            <span className='text-danger d-block text-center'>{this.state.errors['payment']}</span>
                        </Form.Group>
                        <Row className='secure-checkout'>
                            <Col md={8} xs={8}>
                                <h5>Guarenteed safe &#38; secure checkout</h5>
                            </Col>
                            <Col md={3} sm={3} xs={4}>
                                <a rel="noreferrer" target='_blank' href='https://www.stripe.com'><Image src={poweredbystripe} width='90%' /></a>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}


export default InjectedPaymentForm;