import React from 'react';

import AddClass from './components/add-class/add-class';
import Classes from './components/classes/classes';

import './chef-account.scss';

class ChefAccount extends React.Component {
    render() {
        return (
            <>
                <p>{JSON.stringify(this.props.account.accountData)}</p>
                <Classes />
                <AddClass />
            </>
        )
    }
}

export default ChefAccount;