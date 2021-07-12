import React from 'react'
import { Elements } from "@stripe/react-stripe-js";

import Payment from './containers/payment';

import { loadStripe } from "@stripe/stripe-js";

import { settings } from '../../settings';

import './checkout.scss';

class Checkout extends React.Component {
    constructor() {
        super();
        this.stripe = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);
    }


    render() {
        return (
            <Elements stripe={this.stripe}>
                <Payment />
            </Elements>
        )
    }
}

export default Checkout;