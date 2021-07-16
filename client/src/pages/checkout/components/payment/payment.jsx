import React from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Col, Form, Row, Image } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

import { bookClass } from '../../../../services/booking/api';
import history from '../../../../history';
import { settings } from '../../../../settings';

import poweredbystripe from '../../../../assets/resources/images/powered-by-stripe.png';

import './payment.scss';
import { sessionWrapper } from '../../../../helpers/session-wrapper';

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
            errors: '',
            cardErrors: '',
            loading: false,
        }
    }

    handleChange = ({ error }) => {
        if (error)
            this.setState({ cardErrors: error.message });
        else
            this.setState({ cardErrors: '' })
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.cardErrors)
            return;

        if (!this.recaptchaRef.current.getValue()) {
            this.setState({
                errors: 'Please submit the recaptcha',
            });
            return;
        }


        const { stripe, elements } = this.props;

        if (!stripe || !elements)
            return;

        const card = elements.getElement(CardElement);

        this.setState({
            loading: true,
        })

        const cardTokenResponse = await stripe.createToken(card)

        if (cardTokenResponse.error) {
            this.setState({
                cardErrors: cardTokenResponse.error.message,
                loading: false,
            })
            return;
        }

        if (!await sessionWrapper(bookClass, this.props.bookingDetails, cardTokenResponse.token.id)) {
            this.setState({
                errors: 'Payment failed, please try again or contact customer support',
                loading: false,
            });
            return;
        }

        this.setState({
            loading: false,
        })

        history.push('booking-success');
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
            cardErrors: '',
            errors: ''
        })
    }

    render() {
        if (settings.DEBUG)
            console.log(this.props.bookingDetails)

        return (
            <div id='payment'>
                <Form onSubmit={this.handleSubmit}>
                    <div id='card-element-container'>
                        <p className='text-center'>Pay with card</p>
                        <Form.Group>
                            <CardElement className='mb-3' onChange={this.handleChange} options={this.cardElementOptions()} />
                            <span role="alert" className='text-danger mb-0'>{this.state.cardErrors}</span>
                            <div className='d-flex justify-content-center my-4'>
                                <ReCAPTCHA
                                    ref={this.recaptchaRef}
                                    sitekey={settings.RECAPTCHA_SITE_KEY}
                                />
                            </div>

                            <button className='pay-btn mat-btn' type='submit' disabled={!this.props.stripe}>
                                {
                                    this.state.loading ? <div className='loader'></div> : <p>Pay ${this.props.bookingDetails.grandTotal}</p>

                                }
                            </button>
                            <button className='pay-btn mat-btn mt-3 danger' onClick={() => history.push('/')} type='submit' disabled={!this.props.stripe}>
                                Cancel
                            </button>
                            {
                                this.state.errors
                                    ?
                                    <span role="alert" className='text-danger mt-3 d-block'>{this.state.errors}</span>
                                    :
                                    <></>
                            }
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