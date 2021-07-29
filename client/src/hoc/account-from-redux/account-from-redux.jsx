import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const AccountFromRedux = WrappedComponent => {
    return class extends React.Component {
        render() {
            console.log('in account from redux')
            return (
                <>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
    }
}

export default compose(
    connect(mapStateToProps),
    AccountFromRedux,
)
