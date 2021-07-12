import React from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Col, Form, Row, Image } from 'react-bootstrap';

import { bookClass } from '../../../../services/booking/api';
import history from '../../../../history';
import { settings } from '../../../../settings';

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
        this.state = {
            errors: ''
        }
    }

    handleSubmit = async (event) => {
        console.log(event.errors)
        event.preventDefault();

        const { stripe, elements } = this.props;

        if (!stripe || !elements)
            return;

        const card = elements.getElement(CardElement);

        const cardTokenResponse = await stripe.createToken(card)

        if (!await bookClass(this.props.bookingDetails, cardTokenResponse.token.id)) {
            this.setState({
                errors: 'Payment failed, please try again or contact customer support',
            });
            return;
        }
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
        if (settings.DEBUG)
            console.log(this.props.bookingDetails)
        return (
            <div id='payment'>
                <Form onSubmit={this.handleSubmit}>
                    <div id='card-element-container'>
                        <p className='text-center'>Pay with card</p>
                        <Form.Group>
                            <CardElement options={this.cardElementOptions()} />

                            <button className='pay-btn mat-btn mt-5' type='submit' disabled={!this.props.stripe}>
                                Pay ${this.props.bookingDetails.grandTotal}
                            </button>
                            <button className='pay-btn bg-danger mat-btn mt-3' onClick={() => history.push('/')} type='submit' disabled={!this.props.stripe}>
                                Cancel
                            </button>
                            <p className='text-danger error'>{this.state.errors}</p>
                        </Form.Group>
                        <Row className='secure-checkout'>
                            <Col md={7}>
                                <h5>Guarenteed safe &#38; secure checkout</h5>
                            </Col>
                            <Col md={4}>
                                <a rel="noreferrer" target='_blank' href='https://www.stripe.com'><Image src={poweredbystripe} width='90%' fluid /></a>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}


export default InjectedPaymentForm;