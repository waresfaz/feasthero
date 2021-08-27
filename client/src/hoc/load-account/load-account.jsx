import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

import Loader from '../../components/loader/loader';

import { setAccount } from '../../services/accounts/actions';
import { getAccount } from '../../services/accounts/api';

const LoadAccount = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                loading: false,
            }
        }

        async componentDidMount() {
            this.setState({
                loading: true,
            })

            const account = await getAccount();
            if (account.error) {
                this.props.setAccount(null);

                this.setState({
                    loading: false,
                })
                return;
            }


            this.props.setAccount(account.data);

            this.setState({
                loading: false,
            })
        }

        render() {
            return (
                <>
                    {
                        this.state.loading
                            ?
                            <Loader show={this.state.loading} />
                            :
                            <WrappedComponent {...this.props} />
                    }
                </>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAccount: (account) => dispatch(setAccount(account)),
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    LoadAccount
);