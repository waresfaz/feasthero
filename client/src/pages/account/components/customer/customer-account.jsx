import React from 'react';

import './customer-account.scss';

class CustomerAccount extends React.Component {
    render() {
        return (
            <>
                <p>Hello {this.props.account.firstName}! Thank you for joining FeastHero! The accounts feature is not quite ready yet so sit tight!</p>
            </>
        );
    }
}

export default CustomerAccount;