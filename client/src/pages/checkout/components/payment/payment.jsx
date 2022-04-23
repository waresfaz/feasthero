import React from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Col, Form, Row, Image } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

import { settings } from '../../../../settings';
import poweredbystripe from '../../../../assets/resources/images/powered-by-stripe.png';

import { checkout } from '../../../../services/checkout/actions';
import { connect } from 'react-redux';
import history from '../../../../history';

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
            loading: false,
            cardError: '',
        }
    }


    handleChange = ({ error }) => {
        if (error)
            this.setState({ cardError: error.message });
        else
            this.setState({ cardError: '' });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.cardError)
            return;

        if (this.stripeIsUninitialized())
            return;

        const { stripe, elements } = this.props;

        const card = elements.getElement(CardElement);

        this.setState({ loading: true });
        await this.props.checkout(card, stripe, this.recaptchaRef.current.getValue());
        this.setState({ loading: false });
    }

    stripeIsUninitialized = () => {
        const { stripe, elements } = this.props;
        return !stripe || !elements;
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

    render() {
        return (
            <div id='payment'>
                <Form onSubmit={this.handleSubmit}>
                    <div id='card-element-container'>
                        <p className='text-center'>Pay with card</p>
                        <Form.Group>
                            <CardElement className='mb-3' onChange={this.handleChange} options={this.cardElementOptions()} />
                            <span className='text-danger'>{this.state.cardError}</span>
                            <div className='my-4'>
                                <div className='d-flex justify-content-center'>
                                    <ReCAPTCHA
                                        ref={this.recaptchaRef}
                                        sitekey={settings.RECAPTCHA_SITE_KEY}
                                    />
                                </div>
                                <span className='text-danger d-block text-center'>{this.props.errors['recaptcha']}</span>
                            </div>

                            <button className='pay-btn mat-btn' type='submit' disabled={!this.props.stripe}>
                                {
                                    this.state.loading ? <div className='loader'></div> : <p>Pay ${this.props.bookingDetails.grandTotal}</p>

                                }
                            </button>
                            <button className='pay-btn mat-btn mt-3 danger' onClick={() => history.push('/')} type='submit' disabled={!this.props.stripe}>
                                Cancel
                            </button>
                            <span className='text-danger d-block text-center'>{this.props.errors['payment']}</span>
                            <span className='text-danger d-block text-center'>{this.props.errors['booking']}</span>
                        </Form.Group>
                        <Row className='secure-checkout'>
                            <Col md={8} xs={8}>
                                <h5>Guaranteed safe &#38; secure checkout</h5>
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

const mapStateToProps = (state) => {
    return {
        errors: state.checkout.checkoutErrors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkout: (card, stripe, recaptchaValue) => dispatch(checkout(card, stripe, recaptchaValue)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InjectedPaymentForm);