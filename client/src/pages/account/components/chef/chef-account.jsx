import React from 'react';

import './chef-account.scss';
import Classes from './components/classes/classes';

class ChefAccount extends React.Component {
    render() {
        return (
            <>
                <p>{JSON.stringify(this.props.account.accountData)}</p>
                <Classes />
            </>
        )
    }
}

export default ChefAccount;