import React from 'react';
import { connect } from 'react-redux';

import { setAccount } from '../../../../services/accounts/actions';
import history from '../../../../history';
import { logout } from '../../../../services/auth/api';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

class Logout extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    logout = async () => {
        this.setState({ loading: true });
        await logout();
        this.props.clearAccount();
        this.setState({ loading: true });
        history.push('/auth/login',);
    }

    render() {
        return (
            <>
                <Loader show={this.state.loading} />
                <Button className='w-25 py-3' isButton={true} onClick={this.logout}>Logout</Button>
            </>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        clearAccount: () => dispatch(setAccount(undefined))
    }
}

export default connect(null, mapDispatchToProps)(Logout);